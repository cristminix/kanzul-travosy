import { BaseApiService } from "./ApiService"

export class ProductService extends BaseApiService {
  path = "ProductService"

  async getList(page = 1, limit = 10, sortBy = "", sortOrder = "", categoryId?: number) {
    const params: any = { page, limit }
    if (sortBy) params.sortBy = sortBy
    if (sortOrder) params.sortOrder = sortOrder
    if (categoryId) params.categoryId = categoryId
    return await this.get("", params)
  }

  async create(payload: any) {
    return await this.post("", payload)
  }

  async update(id: number, payload: any) {
    return await this.put(`${id}`, payload)
  }

  async delete(id: number) {
    return await super.delete(id)
  }

  async getById(id: number) {
    return await this.get(String(id))
  }
}
