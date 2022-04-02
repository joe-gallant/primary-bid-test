import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { Loader, Notification, Panel, Price, Button, Flex } from 'components';
import { getProductsInCategory, IProduct } from 'utils';
import { Col, Row } from 'styled-bootstrap-grid';
import { AppContext } from 'store';

interface IProductList {
  categoryId?: string;
}

export const ProductList: FunctionComponent<IProductList> = (
  props: IProductList,
) => {
  const { categoryId } = props;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    state: { cart },
    addToCart,
    removeFromCart,
  } = useContext(AppContext);

  useEffect(() => {
    if (categoryId) {
      setError('');
      setLoading(true);
      setProducts([]);
      getProductsInCategory(categoryId)
        .then(res => {
          setLoading(false);
          if (res.length > 0) {
            setProducts(res);
          } else {
            setError('Sorry no products found for this category.');
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err.message ? err.message : 'Oops, something went wrong.');
        });
    } else {
      setError(`Oops, we couldn't find that category.`);
    }
  }, []);

  return (
    <>
      {loading && <Loader data-testid="loader" />}

      {products.length > 0 && (
        <Row>
          {products.map((product, i) => (
            <Col lg={4} key={i}>
              <Panel data-testid={`product-${product.id}`}>
                <img src={product.image} alt={product.title} />
                <Price small>£{product.price}</Price>
                <h4 className="title">{product.title}</h4>
                <br />
                <Flex justify="space-between" style={{ width: '100%' }}>
                  <Link to={`/product/${product.id}`}>View product</Link>
                  {cart.includes(product.id) ? (
                    <Notification
                      style={{ margin: '0' }}
                      type="success"
                      data-testid="added-to-card-notification">
                      Added to cart!
                    </Notification>
                  ) : (
                    <Button
                      data-testid={`product-${product.id}-add`}
                      primary
                      onClick={(): void => addToCart(product.id)}>
                      Add to cart
                    </Button>
                  )}
                </Flex>
                {cart.includes(product.id) && (
                  <Button
                    data-testid={`product-${product.id}-remove`}
                    onClick={(): void => removeFromCart(product.id)}
                    style={{ marginTop: '1rem', width: '100%' }}>
                    Remove from cart
                  </Button>
                )}
              </Panel>
            </Col>
          ))}
        </Row>
      )}

      {error && (
        <Notification data-testid="error-notification">{error}</Notification>
      )}
    </>
  );
};
