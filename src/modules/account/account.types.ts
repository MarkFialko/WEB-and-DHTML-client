export enum Roles {
  ADMIN = 'Администратор',
  USER = 'Пользователь',
  WAITER = 'Официант'
}

export interface IUser {
  firstName: string,
  lastName:string,
  email: string
  id: string,
  roles: Roles[]
}


export interface IBasket {

}
