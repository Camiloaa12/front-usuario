import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h1`
  margin: 0 0 15px;
  color: var(--text-color);
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const ProductDescription = styled.p`
  margin-bottom: 30px;
  line-height: 1.8;
  color: var(--text-color);
`;

const AddToCartButton = styled.button`
  padding: 12px 24px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #c51162;
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: var(--light-gray);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d5d5d5;
  }
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

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar el producto:', err);
        setError('No se pudo cargar el producto. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.nombre} agregado al carrito`);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return <LoadingMessage>Cargando producto...</LoadingMessage>;
  }
  
  if (error || !product) {
    return <ErrorMessage>{error || 'Producto no encontrado'}</ErrorMessage>;
  }
  
  return (
    <div>
      <BackButton onClick={handleGoBack}>
        ← Volver
      </BackButton>
      
      <ProductContainer>
        <ImageContainer>
          <ProductImage 
            src={`http://localhost:5000${product.imagen}`} 
            alt={product.nombre} 
          />
        </ImageContainer>
        
        <ProductInfo>
          <ProductName>{product.nombre}</ProductName>
          <ProductPrice>${product.precio.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.descripcion}</ProductDescription>
          <AddToCartButton onClick={handleAddToCart}>
            Agregar al Carrito
          </AddToCartButton>
        </ProductInfo>
      </ProductContainer>
    </div>
  );
}

export default ProductDetail;