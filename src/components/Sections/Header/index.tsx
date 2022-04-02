import React, { FunctionComponent, useContext } from 'react';
import { Flex, Container, Button } from 'components';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from 'store';

const HeaderContainer = styled.div`
  border-bottom: 1px solid #cccccc;
  position: fixed;
  width: 100%;
  top: 0;
  background: #ffffff;
  box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

const HeaderSpacer = styled.div`
  height: 90px;
  width: 100%;
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  padding-right: 1rem;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuLink = styled(Link)`
  margin-right: 2rem;
`;

const Banner = styled.div`
  padding: 2rem 0 0;
  background: #f3f3f3;
`;

interface IHeader {
  showMenu?: boolean;
}

export const Header: FunctionComponent<IHeader> = (props: IHeader) => {
  const { updateToken, state } = useContext(AppContext);
  const { showMenu } = props;
  const navigate = useNavigate();

  const logout = (): void => {
    updateToken('');
    navigate('/login');
  };

  return (
    <>
      <HeaderSpacer></HeaderSpacer>
      <HeaderContainer>
        <Container>
          <Flex justify="space-between" style={{ height: '90px' }}>
            <Name>Primary Bid Test</Name>
            {(state.authToken || showMenu) && (
              <Menu>
                <MenuLink to="/home">Home</MenuLink>
                <MenuLink to="/cart" data-testid="cart">
                  Cart <strong>({state.cart.length})</strong>
                </MenuLink>
                <Button onClick={logout}>Logout</Button>
              </Menu>
            )}
          </Flex>
        </Container>
      </HeaderContainer>
      {window.location.pathname !== '/home' &&
        window.location.pathname !== '/login' && (
          <Banner>
            <Container>
              <Button onClick={(): void => navigate(-1)}>Go back</Button>
            </Container>
          </Banner>
        )}
    </>
  );
};
