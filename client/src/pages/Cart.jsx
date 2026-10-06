import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCart = () => {
    api.get('/cart')
      .then((res) => setCart(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load cart'));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post('/orders', {
        shippingAddress: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'MH',
          zip: '400001',
          country: 'India',
        },
      });
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!cart) return <p>Loading...</p>;

  const total = cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span>{item.product?.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>₹{item.product?.price}</span>
              <button onClick={() => handleRemove(item.product._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;