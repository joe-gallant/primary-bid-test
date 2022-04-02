/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { IAppContext, IProduct } from 'utils/interfaces';

export const defaultState: IAppContext = {
  cart: [],
  authToken: '',
};

export const AppContext = React.createContext({
  state: defaultState,
  updateToken: (_value: IAppContext['authToken']): void => undefined,
  addToCart: (_value: IProduct['id']): void => undefined,
  removeFromCart: (_value: IProduct['id']): void => undefined,
});
