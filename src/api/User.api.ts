import axiosInstance from '@/api/index'
import type { Roles } from '@/modules/account/account.types'

export class UserApi {
  public static async getMe() {
    return axiosInstance.get('auth/me')
  }

  public static async login(email: string, password: string) {
    return axiosInstance.post('auth/login', {
      email: email,
      password: password
    })
  }

  public static async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return axiosInstance.post('auth/registration', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
  }


  public static async logout() {
    return axiosInstance.post('auth/logout')
  }

  public static async getUsers() {
    return axiosInstance.get('auth/users')
  }

  public static async deleteRole(userId:string, role: Roles) {
    return axiosInstance.delete('auth/roles', {
      data: {
        userId:userId,
        role: role,
      }
    })
  }

}
