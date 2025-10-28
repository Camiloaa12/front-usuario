import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 72px;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const NotFoundText = styled.p`
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 30px;
`;

const HomeButton = styled(Link)`
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #303f9f;
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Página no encontrada</NotFoundText>
      <HomeButton to="/">Volver al Inicio</HomeButton>
    </NotFoundContainer>
  );
}

export default NotFound;