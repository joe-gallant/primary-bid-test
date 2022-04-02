import React, { FunctionComponent } from 'react';
import { Header, Container } from 'components';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const BodyContainer = styled.div`
  background: #f3f3f3;
  width: 100%;
  padding: 2rem 0;
  min-height: calc(100vh - 90px);
`;

export const Layout: FunctionComponent = () => {
  return (
    <>
      <Header />
      <BodyContainer>
        <Container>
          <Outlet />
        </Container>
      </BodyContainer>
    </>
  );
};
