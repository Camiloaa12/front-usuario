import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';

const CartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const CartTitle = styled.h1`
  margin-bottom: 20px;
  color: var(--text-color);
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--dark-gray);
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--light-gray);
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid var(--light-gray);
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  vertical-align: middle;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductName = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: var(--light-gray);
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #d5d5d5;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: var(--danger-color);
  border: none;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--light-gray);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 10px;
`;

const SummaryLabel = styled.span`
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-weight: ${props => props.total ? '700' : '400'};
  font-size: ${props => props.total ? '20px' : '16px'};
  color: ${props => props.total ? 'var(--primary-color)' : 'var(--text-color)'};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ContinueShoppingButton = styled(Link)`
  padding: 12px 20px;
  background-color: var(--light-gray);
  color: var(--text-color);
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d5d5d5;
  }
`;

const CheckoutButton = styled.button`
  padding: 12px 20px;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const ClearCartButton = styled.button`
  padding: 12px 20px;
  background-color: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useContext(CartContext);
  
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };
  
  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast.info(`${productName} eliminado del carrito`);
  };
  
  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart();
      toast.info('Carrito vaciado');
    }
  };
  
  const handleCheckout = () => {
    toast.success('¡Gracias por tu compra!');
    clearCart();
  };
  
  if (cart.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Tu Carrito</CartTitle>
        <EmptyCartMessage>
          <p>Tu carrito está vacío</p>
          <ContinueShoppingButton to="/">Ir a la Tienda</ContinueShoppingButton>
        </EmptyCartMessage>
      </CartContainer>
    );
  }
  
  return (
    <CartContainer>
      <CartTitle>Tu Carrito</CartTitle>
      
      <CartTable>
        <TableHead>
          <TableRow>
            <TableHeader>Producto</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Subtotal</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {cart.map(item => (
            <TableRow key={item._id}>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ProductImage 
                    src={`http://localhost:5000${item.imagen}`} 
                    alt={item.nombre} 
                  />
                  <ProductName to={`/productos/${item._id}`}>
                    {item.nombre}
                  </ProductName>
                </div>
              </TableCell>
              <TableCell>${item.precio.toFixed(2)}</TableCell>
              <TableCell>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput 
                    type="number" 
                    min="1" 
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  />
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </TableCell>
              <TableCell>${(item.precio * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <RemoveButton onClick={() => handleRemoveItem(item._id, item.nombre)}>
                  Eliminar
                </RemoveButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </CartTable>
      
      <CartSummary>
        <SummaryRow>
          <SummaryLabel>Total:</SummaryLabel>
          <SummaryValue total>${total.toFixed(2)}</SummaryValue>
        </SummaryRow>
      </CartSummary>
      
      <ButtonGroup>
        <ContinueShoppingButton to="/">
          Continuar Comprando
        </ContinueShoppingButton>
        <div style={{ display: 'flex', gap: '10px' }}>
          <ClearCartButton onClick={handleClearCart}>
            Vaciar Carrito
          </ClearCartButton>
          <CheckoutButton onClick={handleCheckout}>
            Finalizar Compra
          </CheckoutButton>
        </div>
      </ButtonGroup>
    </CartContainer>
  );
}

export default Cart;