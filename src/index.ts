import Koa from 'koa'
import { Port } from './utils/secrets'
import BodyParser from 'koa-bodyparser'
import vkCallbackMiddleware from './clients/vkCallbackMiddleware'

const koa = new Koa()
koa.use(BodyParser({
  enableTypes: ['json'],
  strict: true
}))

koa.use(vkCallbackMiddleware)

koa.listen(Port)
