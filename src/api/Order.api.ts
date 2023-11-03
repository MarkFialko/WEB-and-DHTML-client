import axiosInstance from '@/api/index'

export class OrderApi {
  public static async completeOrder(orderId: string) {
    return axiosInstance.patch('orders', {
      orderId: orderId
    })
  }

  public static async createOrder() {
    return axiosInstance.post('orders')
  }

  public static async getAllOrders() {
    return axiosInstance.get('orders')
  }

  public static getMyOrders() {
    return axiosInstance.get('orders/me')
  }
}
