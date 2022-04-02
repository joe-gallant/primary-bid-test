import React, { FunctionComponent, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, defaultState } from 'store';
import { IAppContext, IProduct } from 'utils';

interface IAppWrapper {
  children: React.ReactNode;
}

export const AppWrapper: FunctionComponent<IAppWrapper> = (
  props: IAppWrapper,
) => {
  const { children } = props;
  const [appState, setAppState] = useState(defaultState);

  const handleUpdateToken = (value: IAppContext['authToken']): void => {
    const updatedState = { ...appState, authToken: value };
    setAppState(updatedState);
  };

  const handleAddToCart = (id: IProduct['id']): void => {
    const newCart = appState.cart;
    newCart.push(id);
    const updatedState = { ...appState, cart: newCart };
    setAppState(updatedState);
  };

  const handleRemoveFromCart = (id: IProduct['id']): void => {
    const newCart = appState.cart.filter(val => val !== id);
    const updatedState = { ...appState, cart: newCart };
    setAppState(updatedState);
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem('state');
    if (savedState) {
      setAppState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('state', JSON.stringify(appState));
  }, [appState]);

  return (
    <>
      <AppContext.Provider
        value={{
          state: appState,
          updateToken: handleUpdateToken,
          addToCart: handleAddToCart,
          removeFromCart: handleRemoveFromCart,
        }}>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContext.Provider>
    </>
  );
};
