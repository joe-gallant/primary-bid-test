import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './index';
import { AppWrapper } from 'components';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';

describe('Login Form', () => {
  test('Frontend validation', async () => {
    render(
      <AppWrapper>
        <LoginForm />
      </AppWrapper>,
    );

    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('username-notification')).toHaveTextContent(
        'Username is required.',
      );
      expect(screen.getByTestId('password-notification')).toHaveTextContent(
        'Password is required.',
      );
    });
  });

  test('Handles server error', async () => {
    server.use(
      rest.post(`https://fakestoreapi.com/auth/login`, (req, res, ctx) => {
        return res.once(ctx.status(404), ctx.json('User not found.'));
      }),
    );

    render(
      <AppWrapper>
        <LoginForm />
      </AppWrapper>,
    );

    userEvent.type(screen.getByTestId('username-input'), 'Test');
    userEvent.type(screen.getByTestId('password-input'), 'Test');
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-notification')).toHaveTextContent(
        'User not found.',
      );
    });
  });

  test('Success', async () => {
    render(
      <AppWrapper>
        <LoginForm />
      </AppWrapper>,
    );

    userEvent.type(screen.getByTestId('username-input'), 'Test');
    userEvent.type(screen.getByTestId('password-input'), 'Test');
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-notification')).toBeInTheDocument();
    });
  });
});
