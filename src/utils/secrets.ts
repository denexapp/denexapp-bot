import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const parseString = (name: string): string => {
  const variable = process.env[name]
  if (typeof variable === 'undefined') {
    process.exit(1)
  }
  return variable
}

const parseInteger = (name: string): number => {
  const variable = Number.parseInt(parseString(name))
  if (isNaN(variable)) {
    process.exit(1)
  }
  return variable
}

export const VkConfirmationKey = parseString('VkConfirmationKey')
export const VkSecretKey = parseString('VkSecretKey')
export const VkGroupId = parseInteger('VkGroupId')
export const Port = parseInteger('Port')
