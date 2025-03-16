import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 10);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice((page - 1) * 10, page * 10).map((prod) => (
            <span className="products__single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            ◀️
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </span>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            ▶️
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
