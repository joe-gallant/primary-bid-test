import React, { FunctionComponent } from 'react';
import { CategoryList } from 'components';

export const Home: FunctionComponent = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>
        Here is a list of all of our product categories. Select the category you
        wish to view.
      </p>
      <br />
      <h3>Categories:</h3>

      <CategoryList />
    </>
  );
};
