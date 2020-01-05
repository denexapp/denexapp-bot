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
  .use(bodyParser)
  .post('/vk-callback', vkCallbackMiddleware)

koa
  .use(router.routes())
  .use(router.allowedMethods())

koa.listen(Port)
