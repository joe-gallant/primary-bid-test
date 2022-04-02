import React, { FunctionComponent, useEffect, useState } from 'react';
import { Loader, Notification, Panel } from 'components';
import { getCategories, ICategory } from 'utils';
import { Col, Row } from 'styled-bootstrap-grid';
import { Link } from 'react-router-dom';

export const CategoryList: FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setLoading(true);
    setCategories([]);
    getCategories()
      .then(res => {
        setLoading(false);
        if (res.length > 0) {
          setCategories(res);
        } else {
          setError('Sorry but there are no categories at this time.');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.message ? err.message : 'Oops, something went wrong.');
      });
  }, []);

  return (
    <>
      {loading && <Loader data-testid="loader" />}

      {categories.length > 0 && (
        <Row>
          {categories.map((category, i) => (
            <Col lg={3} key={i}>
              <Link to={`/category/${category}`}>
                <Panel data-testid={`category-${category}`}>
                  <h4>{category}</h4>
                </Panel>
              </Link>
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
