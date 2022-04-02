import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetail } from './index';
import { AppWrapper, Header } from 'components';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

describe('Product Detail', () => {
  test('Renders Product Detail', async () => {
    render(
      <AppWrapper>
        <ProductDetail productId="1" />
      </AppWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('product-title')).toHaveTextContent(
        'Product 1',
      );
    });
  });

  test('Handles server error', async () => {
    server.use(
      rest.get(`https://fakestoreapi.com/products/1`, (req, res, ctx) => {
        return res.once(
          ctx.status(404),
          ctx.json('Sorry, but we cant find this product.'),
        );
      }),
    );

    render(
      <AppWrapper>
        <ProductDetail productId="1" />
      </AppWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-notification')).toHaveTextContent(
        'Sorry, but we cant find this product.',
      );
    });
  });

  test('Can add and remove product to cart', async () => {
    render(
      <AppWrapper>
        <Header showMenu />
        <ProductDetail productId="1" />
      </AppWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Add to cart
    await waitFor(() => {
      expect(screen.getByTestId('product-title')).toBeInTheDocument();
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
