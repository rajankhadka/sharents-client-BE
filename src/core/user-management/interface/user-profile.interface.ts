export interface ICreateUserProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface IUserInfo {
  email: string;
  id: string;
}
