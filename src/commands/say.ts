import { Command, MessageHandler } from './handleMessage'

const messageHandler: MessageHandler = async text => text
const prefixLowerCase = 'say'

const say: Command = {
  messageHandler,
  prefixLowerCase,
  requirments: []
}

export default say