export type ICategory = Array<string>;

export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface IAppContext {
  cart: IProduct['id'][];
  authToken: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}
