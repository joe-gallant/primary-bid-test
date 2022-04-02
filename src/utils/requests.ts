import { IAuthResponse, ICategory, ILoginForm, IProduct } from './interfaces';

const request = <T>(
  url: string,
  method?: 'GET' | 'POST',
  body?: BodyInit | object | null,
): Promise<T> => {
  return fetch(
    url,
    body
      ? {
          method: method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      : undefined,
  ).then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(text ? text : 'Oops, something went wrong.');
      });
    }
    return response.json();
  });
};

export const getCategories = (): Promise<ICategory> => {
  return request<ICategory>(`https://fakestoreapi.com/products/categories`);
};

export const getProductsInCategory = (
  categoryId: string,
): Promise<IProduct[]> => {
  return request<IProduct[]>(
    `https://fakestoreapi.com/products/category/${categoryId}`,
  );
};

export const getProduct = (productId: string): Promise<IProduct> => {
  return request<IProduct>(`https://fakestoreapi.com/products/${productId}`);
};

export const submitLogin = (body: ILoginForm): Promise<IAuthResponse> => {
  return request<IAuthResponse>(
    `https://fakestoreapi.com/auth/login`,
    'POST',
    body,
  );
};
