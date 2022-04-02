import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Loader, Notification, Price, Button } from 'components';
import { getProduct, IProduct } from 'utils';
import { Col, Row } from 'styled-bootstrap-grid';
import { AppContext } from 'store';

interface IProductDetail {
  productId?: string;
}

export const ProductDetail: FunctionComponent<IProductDetail> = (
  props: IProductDetail,
) => {
  const { productId } = props;
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    state: { cart },
    addToCart,
    removeFromCart,
  } = useContext(AppContext);

  useEffect(() => {
    if (productId) {
      setError('');
      setLoading(true);
      setProduct(undefined);
      getProduct(productId)
        .then(res => {
          setLoading(false);
          setProduct(res);
        })
        .catch(err => {
          setLoading(false);
          setError(err.message);
        });
    } else {
      setError(`Oops, we couldn't find that product`);
    }
  }, []);

  return (
    <>
      {loading && <Loader data-testid="loader" />}

      {product && (
        <>
          <Row>
            <Col lg={6}>
              <h1 data-testid="product-title">{product.title}</h1>
              <h5>
                Category:{' '}
                <Link to={`/category/${product.category}`}>
                  {product.category}
                </Link>
              </h5>
              <p>{product.description}</p>
              <br />
              <Price>£{product.price}</Price>
              <br />
              <br />
              {cart.includes(product.id) ? (
                <>
                  <Notification
                    type="success"
                    data-testid="added-to-card-notification">
                    Added to cart!
                  </Notification>
                  <Button
                    data-testid={`product-${product.id}-remove`}
                    onClick={(): void => removeFromCart(product.id)}>
                    Remove from cart
                  </Button>
                </>
              ) : (
                <Button
                  primary
                  data-testid={`product-${product.id}-add`}
                  style={{ marginRight: '1rem' }}
                  onClick={(): void => addToCart(product.id)}>
                  Add to cart
                </Button>
              )}
              <br />
              <br />
            </Col>
            <Col lgOffset={1} lg={5}>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: '100%', height: '300px' }}
              />
            </Col>
          </Row>
        </>
      )}

      {error && (
        <Notification data-testid="error-notification">{error}</Notification>
      )}
    </>
  );
};
