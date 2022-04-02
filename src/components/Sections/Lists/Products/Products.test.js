import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from './index';
import { AppWrapper, Header } from 'components';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';
import userEvent from '@testing-library/user-event';

describe('Product List', () => {
  test('Renders Product List', async () => {
    render(
      <AppWrapper>
        <ProductList categoryId="1" />
      </AppWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
    });
  });

  test('Handles server error', async () => {
    server.use(
      rest.get(
        `https://fakestoreapi.com/products/category/1`,
        (req, res, ctx) => {
          return res.once(
            ctx.status(404),
            ctx.json('Sorry, but we cant find any products.'),
          );
        },
      ),
    );

    render(
      <AppWrapper>
        <ProductList categoryId="1" />
      </AppWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-notification')).toHaveTextContent(
        'Sorry, but we cant find any products.',
      );
    });
  });

  test('Can add and remove product to cart', async () => {
    render(
      <AppWrapper>
        <Header showMenu />
        <ProductList categoryId="1" />
      </AppWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Add to cart
    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('product-1-add'));
    await waitFor(() => {
      expect(screen.getByTestId('cart')).toHaveTextContent('(1)');
      expect(
        screen.getByTestId('added-to-card-notification'),
      ).toBeInTheDocument();
    });

    // Remove from cart
    userEvent.click(screen.getByTestId('product-1-remove'));
    await waitFor(() => {
      expect(screen.getByTestId('cart')).toHaveTextContent('(0)');
    });
  });
});
