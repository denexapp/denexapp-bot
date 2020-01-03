import Koa from 'koa'
import { Port } from './utils/secrets'
import BodyParser from 'koa-bodyparser'
import vkMiddleware from './clients/vk'

const koa = new Koa()
koa.use(BodyParser({
  enableTypes: ['json'],
  strict: true
}))

koa.use(vkMiddleware)

koa.listen(Port)
