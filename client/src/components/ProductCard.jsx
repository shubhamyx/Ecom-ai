import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <Link to={`/product/${product._id}`}>View</Link>
    </div>
  );
}

export default ProductCard;