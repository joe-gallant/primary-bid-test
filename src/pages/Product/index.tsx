import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from 'components';

export const Product: FunctionComponent = () => {
  const { productId } = useParams();

  return (
    <>
      <ProductDetail productId={productId} />
    </>
  );
};
