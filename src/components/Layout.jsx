import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../context/CartContext';

const Header = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  margin-left: 20px;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const CartIcon = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: var(--dark-gray);
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
`;

function Layout() {
  const { itemCount } = useContext(CartContext);
  
  return (
    <>
      <Header>
        <Nav>
          <Logo to="/">Tienda Online</Logo>
          <NavLinks>
            <NavLink to="/">Inicio</NavLink>
            <CartIcon to="/carrito">
              Carrito
              {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
            </CartIcon>
          </NavLinks>
        </Nav>
      </Header>
      
      <Main>
        <Outlet />
      </Main>
      
      <Footer>
        <p>&copy; {new Date().getFullYear()} Tienda Online. Todos los derechos reservados.</p>
      </Footer>
    </>
  );
}

export default Layout;