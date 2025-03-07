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
export interface ICredentials {
  username: string;
  password: string;
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

export interface ICompany {
  id: number;
  name: string;
  address: string;
  zip: string;
  country: string;
  employeeCount: number;
  industry: string;
  marketCap: number;
  domain: string;
  logo: string;
  ceoName: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}

export interface IBlog {
  userId: number;
  id: number;
  title: string;
  body: string;
  link: string;
  comment_count: number;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
