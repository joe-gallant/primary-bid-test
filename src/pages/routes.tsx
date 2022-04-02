import React, { FunctionComponent, useContext } from 'react';
import { Layout } from 'components';
import { Route, Navigate, Routes } from 'react-router-dom';
import { Home, Login, Category, Product } from 'pages';
import { AppContext } from 'store';

export const Routing: FunctionComponent = () => {
  const { state } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {state.authToken ? (
          <>
            {/* Private routes */}
            <Route path="home" element={<Home />} />
            <Route path="category/:categoryId" element={<Category />} />
            <Route path="product/:productId" element={<Product />} />
          </>
        ) : (
          <>
            {/* Public routes */}
            <Route path="login" element={<Login />} />
          </>
        )}

        <Route
          index
          element={<Navigate replace to={state.authToken ? 'home' : 'login'} />}
        />
      </Route>
    </Routes>
  );
};
