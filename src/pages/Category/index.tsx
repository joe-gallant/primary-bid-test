import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { ProductList } from 'components';

export const Category: FunctionComponent = () => {
  const { categoryId } = useParams();

  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
      <p>Click to view a product within the {categoryId} category.</p>
      <br />
      <h3>Products:</h3>

      <ProductList categoryId={categoryId} />
    </>
  );
};
