import { IAppSetting } from "./IAppSetting"
import { IAuthInfo } from "./IAuthInfo"
import { IUser } from "./IUser"
import { IUserInfo } from "./IUserInfo"
import { TAuthCallback } from "./TAuthCallback"
export interface IBackendProvider {
  name: string
  getCurrentSetting(): Promise<IAppSetting>
  getCurrentUser(): IUser | null
  signIn(email: string, password: string): Promise<void>
  signOut(): Promise<void>
  useAuth(): IAuthInfo
  // getUserInfo(): Promise<IUserInfo>
  getCurrentUserInfo(): Promise<IUserInfo>
  updateCurrentUserInfo(updates: IUserInfo): Promise<void>
  addAuthListener(callback: TAuthCallback): void
}
