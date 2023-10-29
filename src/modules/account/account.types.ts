export enum Roles {
  ADMIN = 'Администратор',
  USER = 'Пользователь',
  WAITER = 'Официант'
}

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  roles: Roles[]
}
