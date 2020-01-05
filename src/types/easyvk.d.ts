type EasyvkObjectType = any

declare function easyvk(options: any): Promise<EasyvkObjectType>

declare module 'easyvk' {
  export type EasyvkObject = EasyvkObjectType
  export default easyvk
}

