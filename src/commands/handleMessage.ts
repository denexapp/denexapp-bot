import { sendMessage } from '../clients/vk'
import strings from '../utils/strings'
import say from './say'

export type Requirment = 'vkToken' | 'lastFmToken'
export type MessageHandler = (text: string) => Promise<string>

export type Command = {
  prefixLowerCase: string
  messageHandler: MessageHandler
  requirments: Array<Requirment>
}

const commands: Array<Command> = [say]

const handleMessage = async (text: string, vkId: number) => {
  const lowerCaseText = text.toLowerCase()

  let command: Command | null = null
  
  for (const possibleCommand of commands) {
    if (lowerCaseText.startsWith(possibleCommand.prefixLowerCase)) {
      command = possibleCommand
      break
    }
  }

  if (command === null) {
    sendMessage(strings.unknownCommand, vkId)
    return
  }

  const responseText = await command.messageHandler(text)

  sendMessage(responseText, vkId)
}

export default handleMessage