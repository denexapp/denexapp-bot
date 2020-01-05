import Koa from 'koa'
import { Port } from './utils/secrets'
import BodyParser from 'koa-bodyparser'
import vkCallbackMiddleware from './vkCallbackMiddleware'
import Router from '@koa/router'
import { initVkClient } from './clients/vk'

const main = async () => {
  const koa = new Koa()
  const router = new Router()
  const bodyParser = BodyParser({
    enableTypes: ['json'],
    strict: true
  })

  await initVkClient()

  router
    .use(bodyParser)
    .post('/vk-callback', vkCallbackMiddleware)

  koa
    .use(router.routes())
    .use(router.allowedMethods())

  koa.listen(Port)
}

main()