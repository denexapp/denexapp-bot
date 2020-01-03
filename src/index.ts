import Koa from 'koa'
import KoaJson from 'koa-json'
import { Port } from './utils/secrets'

type KoaState = {
  confirmationKey: string
}

const koa = new Koa<KoaState>()

koa.use(KoaJson())

koa.listen(Port)
