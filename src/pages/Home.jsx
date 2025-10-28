import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
  color: var(--text-color);
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ViewButton = styled(Link)`
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const AddToCartButton = styled.button`
  padding: 8px 12px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #c51162;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 20px;
  color: var(--text-color);
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--dark-gray);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--danger-color);
`;

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.nombre} agregado al carrito`);
  };
  
  if (loading) {
    return <LoadingMessage>Cargando productos...</LoadingMessage>;
  }
  
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  return (
    <div>
      <PageTitle>Nuestros Productos</PageTitle>
      
      <ProductsGrid>
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id}>
              <ProductImage 
                src={`http://localhost:5000${product.imagen}`} 
                alt={product.nombre} 
              />
              <ProductInfo>
                <ProductName>{product.nombre}</ProductName>
                <ProductPrice>${product.precio.toFixed(2)}</ProductPrice>
                <ButtonGroup>
                  <ViewButton to={`/productos/${product._id}`}>
                    Ver Detalles
                  </ViewButton>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    Agregar
                  </AddToCartButton>
                </ButtonGroup>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </ProductsGrid>
    </div>
  );
}

export default Home;