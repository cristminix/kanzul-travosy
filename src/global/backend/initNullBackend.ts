import base64 from "base-64"
import { IAppSetting, IBackendProvider, IBackendSetting, IUser, IUserInfo } from "./types"
import { useAuth } from "./null-backend/useAuth"

function decryptToken(encryptedToken: string) {
  return base64.decode(encryptedToken)
}

export function initNullBackend(setting: IBackendSetting) {
  const provider: IBackendProvider = {
    name: "firebase",
    addAuthListener(callback) {
      //   return addAuthListener(callback)
    },
    async getCurrentSetting() {
      const currentSetting: IAppSetting = {
        corsProxyUrl: "http://localhost:8787",
        repoUrl: "http://localhost:3000/kanzululum-web.git",
        // btoa("aa09dc49e611455b445433db5f5507b3a2b17df0")
        token: decryptToken("YWEwOWRjNDllNjExNDU1YjQ0NTQzM2RiNWY1NTA3YjNhMmIxN2RmMA=="),
      }
      return currentSetting
    },
    getCurrentUser() {
      const currentUser: IUser = {
        id: 1000,
      }
      return currentUser
    },
    async getCurrentUserInfo() {
      const userInfo: IUserInfo = {
        id: 1000,
        avatarUrl: "assets/images/faces/kintel.jpg",
        bio: "Just a simple man",
        email: "sutoyocutez@gmail.com",
        username: "kindtell",
      }
      return userInfo
    },
    async signIn(email, password) {
      console.log({ email, password })
    },
    async signOut() {
      //   await signOut()
      console.log("signOut")
    },
    async updateCurrentUserInfo(updates) {
      console.log(`updateCurrentUserInfo`, { updates })
      //   await updateCurrentUserInfo(updates)
    },
    useAuth() {
      return useAuth()
    },
  }
  setting.setProvider(provider)
}
