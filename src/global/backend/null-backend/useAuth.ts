import { IAuthInfo } from "../types"

export function useAuth(): IAuthInfo {
  const authInfo: IAuthInfo = {
    isLoading: false,
    user: {
      id: 1000,
    },
  }
  return authInfo
}
