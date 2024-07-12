import { getCurrentUser, signIn, signOut, useAuth } from "../firebase/auth"
import { addAuthListener } from "../firebase/auth/addAuthListener"
import { getCurrentSetting } from "../firebase/setting"
import { getCurrentUserInfo, updateCurrentUserInfo } from "../firebase/user"
import { IAppSetting, IBackendProvider, IBackendSetting, IUserInfo } from "./types"

export function initFirebaseBackend(setting: IBackendSetting) {
  const provider: IBackendProvider = {
    name: "firebase",
    addAuthListener(callback) {
      return addAuthListener(callback)
    },
    async getCurrentSetting() {
      const currentSetting = await getCurrentSetting()
      return currentSetting as unknown as IAppSetting
    },
    getCurrentUser() {
      const currentUser = getCurrentUser()
      return currentUser
    },
    async getCurrentUserInfo() {
      const userInfo = await getCurrentUserInfo()
      return userInfo as IUserInfo
    },
    async signIn(email, password) {
      await signIn(email, password)
    },
    async signOut() {
      await signOut()
    },
    async updateCurrentUserInfo(updates) {
      await updateCurrentUserInfo(updates)
    },
    useAuth() {
      return useAuth()
    },
  }
  setting.setProvider(provider)
}
