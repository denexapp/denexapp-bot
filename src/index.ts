import Koa from 'koa'
import { Port } from './utils/secrets'
import BodyParser from 'koa-bodyparser'
import vkCallbackMiddleware from './clients/vkCallbackMiddleware'
import Router from '@koa/router'

const koa = new Koa()
const router = new Router()
const bodyParser = BodyParser({
  enableTypes: ['json'],
  strict: true
})

router
  .post('/vk-callback', vkCallbackMiddleware)
  .use(bodyParser)

koa
  .use(router.routes())
  .use(router.allowedMethods())
  .use(vkCallbackMiddleware)

koa.listen(Port)
