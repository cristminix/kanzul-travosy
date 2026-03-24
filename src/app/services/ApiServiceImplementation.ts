import { BaseApiService } from "./ApiService"

// Kelas konkrit dari BaseApiService untuk digunakan di tempat yang sebelumnya menginstansiasi BaseApiService secara langsung
export class ApiService extends BaseApiService {
  constructor() {
    super()
  }
}
