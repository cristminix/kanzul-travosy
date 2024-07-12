import { IBackendProvider } from "./IBackendProvider"

export interface IBackendSetting {
  provider: IBackendProvider | null
  isEnable(): boolean
  setProvider(provider: IBackendProvider): void
  getProvider(): IBackendProvider | null
}
