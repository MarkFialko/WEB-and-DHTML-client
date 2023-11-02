import axiosInstance from '@/api/index'

export class BasketApi {
  public static async getAll() {
    return axiosInstance.get('basket')
  }

  public static async add(dishes: string[]) {
    return axiosInstance.post('basket/add',{
      dishId: dishes
    })
  }

  public static async remove(dishes: string[]) {
    return axiosInstance.delete('basket', {
    data: {
      dishId: dishes
    }
  })
  }

}
