import axiosInstance from '@/api/index'

export class DishApi {
  public static async getAll() {
    return axiosInstance.get('dishes')
  }

  public static async create(data: any) {
    return axiosInstance.post('basket/add', data)
  }

  public static async getOne(dishId: string) {
    return axiosInstance.get(`basket/${dishId}`)
  }
}
