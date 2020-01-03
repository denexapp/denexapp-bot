import Koa from 'koa'
import { Port } from './utils/secrets'
import vkMiddleware from './clients/vk'

const koa = new Koa()

koa.use(vkMiddleware)

koa.listen(Port)
