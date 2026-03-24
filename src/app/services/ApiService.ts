export abstract class BaseApiService {
  apiBaseUrl = "http://localhost:8787/api"
  path = "health"
  constructor() {
    const host = document.location.host
    // console.log(document.location.host)
    if (host.includes("kv")) {
      this.apiBaseUrl = "https://kv.ponpeskanzululumcirebon.com/api"
    }
  }
  setApiBaseUrl(url: string) {
    this.apiBaseUrl = url
  }
  setPath(path: string) {
    this.path = path
  }
  async getAccessToken() {
    let accessToken = localStorage.getItem("accessToken")

    const decodeJWT = (token: string) => {
      try {
        const parts = token.split(".")
        if (parts.length !== 3) {
          throw new Error("Invalid JWT token format")
        }

        // Decode payload (bagian tengah dari JWT)
        const payload = parts[1]
        // Tambahkan padding jika diperlukan
        const paddedPayload =
          payload + "=".repeat((4 - (payload.length % 4)) % 4)
        const decodedPayload = atob(paddedPayload)
        return JSON.parse(decodedPayload)
      } catch (error) {
        console.error("Error decoding JWT:", error)
        return null
      }
    }

    const isExpired = () => {
      if (!accessToken) {
        return true // Token tidak ada dianggap expired
      }

      const decodedPayload = decodeJWT(accessToken)
      if (!decodedPayload || !decodedPayload.exp) {
        return true // Jika tidak bisa decode atau tidak ada klaim exp, anggap expired
      }

      // Bandingkan waktu expiry (dalam detik) dengan waktu saat ini (dalam detik)
      const currentTime = Math.floor(Date.now() / 1000)
      return decodedPayload.exp < currentTime
    }

    // Return token jika tidak expired, jika tidak kembalikan null atau lakukan refresh
    if (!isExpired()) {
      return accessToken
    } else {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await this.updateAcessToken()
      accessToken = newAccessToken as string
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", newRefreshToken)
    }

    return accessToken
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken")
  }
  async updateAcessToken() {
    const endPoint = `${this.apiBaseUrl}/LoginService/refresh`
    const refreshToken = localStorage.getItem("refreshToken")
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      })
      const { accessToken, refreshToken: newRefreshToken } =
        await response.json()
      return { accessToken, refreshToken: newRefreshToken }
      console.log({ accessToken, refreshToken })
    } catch (error) { }
    return {}
  }
  //@ts-ignore
  async fetch(url: string, options: any) {
    let response
    const accessToken = await this.getAccessToken()
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      ...options,
    }
    try {
      response = await fetch(url, fetchOptions)
      return await response.json()
    } catch (error) {
      return response
    }
  }
  async get(servicePath: string = "", payload: any = null) {
    let url = `${this.apiBaseUrl}/${this.path}${servicePath ? `/${servicePath}` : ""}`
    if (payload) {
      const queryString = new URLSearchParams(payload).toString()
      url += `?${queryString}`
    }
    // console.log({ endPoint: url })
    return await this.fetch(url, {
      method: "GET",
    })
  }
  async post(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}${servicePath ? `/${servicePath}` : ""}`
    return await this.fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }
  async put(servicePath: string, payload: any) {
    const endPoint = `${this.apiBaseUrl}/${this.path}${servicePath ? `/${servicePath}` : ""}`
    return await this.fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
  }
  async delete(servicePath: string | number) {
    const endPoint = `${this.apiBaseUrl}/${this.path}${servicePath ? `/${servicePath}` : ""
      }`
    return await this.fetch(endPoint, {
      method: "DELETE",
    })
  }
}
