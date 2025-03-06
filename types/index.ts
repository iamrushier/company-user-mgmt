interface IAuthStatus {
  success: boolean;
}
export interface IAuthResponseSuccess extends IAuthStatus {
  message: string;
  token: string;
}
export interface IAuthResponseFailure extends IAuthStatus {
  error: {
    code: string;
    message: string;
  };
}

export interface IUser {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  address: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
  photo?: string;
}
