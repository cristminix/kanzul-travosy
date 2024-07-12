import { IUser } from "./IUser"

export interface IAuthInfo {
  isLoading: boolean
  user: IUser | null
}
