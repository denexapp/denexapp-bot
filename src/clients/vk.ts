import easyVk, { EasyvkObject } from 'easyvk'
import { VKGroupAccessToken } from '../utils/secrets'

let groupSession: EasyvkObject | null

export const initVkClient = async () => {
  groupSession = await easyVk({ access_token: VKGroupAccessToken })
}

export const sendMessage = async (message: string, vkId: number) => {
  await groupSession.call('messages.send', {
    peer_id: vkId,
    message
  })
}