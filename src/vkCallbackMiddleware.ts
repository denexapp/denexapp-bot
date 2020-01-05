import { Middleware } from 'koa'
import { JsonDecoder } from 'ts.data.json'
import { VkConfirmationKey, VkSecretKey, VkGroupId } from './utils/secrets'
import handleMessage from './commands/handleMessage'

interface VkCallback {
  type: string
  secret: string
  group_id: number
}

interface VkCallbackEvent<O extends object> extends VkCallback {
  type: string
  object: O
  secret: string
  group_id: number
};


type VkMessage = {
  text: string
  from_id: number
  // ...
}

type VkClientInfo = {
  lang_id: number
  // ...
}

type VkCallbackEventMessageNew = VkCallbackEvent<{
  message: VkMessage
  client_info: VkClientInfo
}>

const vkCallbackEventMessageNewDecoder = JsonDecoder.object<VkCallbackEventMessageNew>(
  {
    type: JsonDecoder.string,
    object: JsonDecoder.object<{
      message: VkMessage,
      client_info: VkClientInfo
    }>({
      message: JsonDecoder.object({
        text: JsonDecoder.string,
        from_id: JsonDecoder.number
      }, 'VkMessage'),
      client_info: JsonDecoder.object({
        lang_id: JsonDecoder.number
      }, 'VkClientInfo')
    }, 'VkCallbackMessageNewObject'),
    secret: JsonDecoder.string,
    group_id: JsonDecoder.number
  },
  'VkCallbackEventMessageNew'
)

const vkCallbackDecoder = JsonDecoder.object<VkCallback>(
  {
    type: JsonDecoder.string,
    secret: JsonDecoder.string,
    group_id: JsonDecoder.number
  },
  'VkCallback'
)

const vkCallbackMiddleware: Middleware = async ctx => {
  let vkCallback: VkCallback

  // Check is it valid callback
  try {
    vkCallback = await vkCallbackDecoder.decodePromise(ctx.request.body)
  } catch (e) {
    console.log(`Invalid body format recieved:\n${e}`)
    console.log(`Recieved body:\n${JSON.stringify(ctx.request.body)}`)
    return
  }

  // Check secret code
  if (vkCallback.secret !== VkSecretKey) {
    console.log(`Invalid secret code: ${vkCallback.secret}`)
    return
  }

  // Check groupId
  if (vkCallback.group_id !== VkGroupId) {
    console.log(`Invalid secret code: ${vkCallback.secret}`)
    return
  }

  // This is confirmation request
  if (vkCallback.type === 'confirmation' && ctx.method === 'POST') {
    ctx.body = VkConfirmationKey
    return
  }

  // This is not confirmation request, we should response 'ok'
  ctx.body = 'ok'

  if (vkCallback.type === 'message_new') {
    let newMessage: VkCallbackEventMessageNew
    try {
      newMessage = await vkCallbackEventMessageNewDecoder.decodePromise(ctx.request.body)
    } catch (e) {
      console.log(`Invalid body format recieved (message_new format expected):\n${e}`)
      console.log(`Recieved body:\n${JSON.stringify(ctx.request.body)}`)
      return
    }

    const { text, from_id } = newMessage.object.message

    await handleMessage(text, from_id)
  }
}

export default vkCallbackMiddleware
