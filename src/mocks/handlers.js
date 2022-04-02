import { rest } from 'msw';

export const handlers = [
  rest.post(`https://fakestoreapi.com/auth/login`, (req, res, ctx) => {
    return res(ctx.json({ token: '123' }));
  }),
  rest.get(`https://fakestoreapi.com/products/categories`, (req, res, ctx) => {
    return res(ctx.json(['Category 1', 'Category 2']));
  }),
  rest.get(`https://fakestoreapi.com/products/category/1`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: 'Product 1',
          price: '10',
          category: 'jewelery',
          description: 'This is a description',
          image: 'product.png',
        },
        {
          id: 2,
          title: 'Product 2',
          price: '20',
          category: 'jewelery',
          description: 'This is a description',
          image: 'product.png',
        },
      ]),
    );
  }),
  rest.get(`https://fakestoreapi.com/products/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        title: 'Product 1',
        price: '10',
        category: 'jewelery',
        description: 'This is a description',
        image: 'product.png',
      }),
    );
  }),
];
