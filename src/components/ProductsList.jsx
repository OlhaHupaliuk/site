// ProductsList.jsx
import "./ProductsList.css";

function ProductsList({ products }) {
  if (!products.length) {
    return <p className="no-products">Немає нових товарів 💤</p>;
  }

  return (
    <div className="products-container">
      {products.map((p, i) => (
        <div key={i} className="product-card">
          {p.img && (
            <img src={p.img} alt={p.title} className="product-image" />
          )}
          <div className="product-info">
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="product-title">
              {p.title}
            </a>
            {p.price && <p className="product-price">{p.price} ₴</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
