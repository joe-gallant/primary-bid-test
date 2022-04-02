import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CategoryList } from './index';
import { AppWrapper } from 'components';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';

describe('Category List', () => {
  test('Renders Category List', async () => {
    render(
      <AppWrapper>
        <CategoryList />
      </AppWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('category-Category 1')).toBeInTheDocument();
      expect(screen.getByTestId('category-Category 2')).toBeInTheDocument();
    });
  });

  test('Handles server error', async () => {
    server.use(
      rest.get(
        `https://fakestoreapi.com/products/categories`,
        (req, res, ctx) => {
          return res.once(
            ctx.status(404),
            ctx.json('Sorry, but we cant find that category.'),
          );
        },
      ),
    );

    render(
      <AppWrapper>
        <CategoryList />
      </AppWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-notification')).toHaveTextContent(
        'Sorry, but we cant find that category.',
      );
    });
  });
});
