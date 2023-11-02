import axiosInstance from '@/api/index'

export class DishApi {
    public static async getAll() {
      try {
        const response = await axiosInstance.get('dishes')

        return Promise.resolve(response.data)
      } catch (e) {
        return Promise.reject(e.response.data.message)
      }

    }
}
