import { initFirebaseBackend } from "./initFirebaseBackend"
import { initNullBackend } from "./initNullBackend"
import { IBackendProvider, IBackendSetting } from "./types"
type TAuthBackend = "firebase" //| "cf-worker"  | "endpoint"
interface IConfig {
  ENABLE_AUTH: boolean
  AUTH_BACKEND: TAuthBackend
}
// interface IBackend {
//   setting: IBackendSetting
// }

export function loadBackend(config: IConfig): IBackendSetting {
  const setting: IBackendSetting = {
    provider: null,
    isEnable() {
      return config.ENABLE_AUTH
    },
    getProvider() {
      return this.provider
    },
    setProvider(provider: IBackendProvider) {
      this.provider = provider
    },
  }

  if (setting.isEnable()) {
    if (config.AUTH_BACKEND === "firebase") {
      initFirebaseBackend(setting)
    }
  } else {
    initNullBackend(setting)
  }
  return setting
}
