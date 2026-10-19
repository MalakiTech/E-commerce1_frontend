import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://e-commerce1-backend-211x.onrender.com/cart/";

const authConfig = () => ({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default function Cart1() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get(API, authConfig());
        console.log("Cart response:", res.data); // check the shape here

        // Handles { cart: { items: [...] } }, { cart: [...] } or [...]
        const cart = res.data.cart ?? res.data;
        setItems(Array.isArray(cart) ? cart : cart.items ?? []);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setError("Could not load your cart. Please log in and try again.");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Adjust the field names (product.name, product.price...) to your API
  const total = items.reduce(
    (sum, it) => sum + (it.product?.price ?? it.price ?? 0) * (it.quantity ?? 1),
    0
  );

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;
  if (!items.length)
    return (
      <p>
        Your cart is empty. <Link to="/">Browse products</Link>
      </p>
    );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>Your cart</h2>
      {items.map((it, i) => {
        const p = it.product ?? it;
        return (
          <div
            key={it.id ?? i}
            style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ddd" }}
          >
            <span>
              {p.name ?? p.title} × {it.quantity ?? 1}
            </span>
            <span>₹{(p.price ?? 0) * (it.quantity ?? 1)}</span>
          </div>
        );
      })}
      <h3>Total: ₹{total}</h3>

      <p>kkkkkk</p>
    </div>
  );
}

// ---------------------------------------------------------------
// 1) Add the route (App.jsx / main.jsx):
//
//   import Cart from "./Cart";
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/cart" element={<Cart />} />
//   </Routes>
//
// 2) In Home, add a link/button to open it:
//
//   import { Link } from "react-router-dom";
//   <Link to="/cart">Cart ({cartCount})</Link>
//
// 3) Make the catch in your addToCart safe (error.response can be undefined):
//
//   } catch (error) {
//     console.log(error.response?.data || error.message);
//   }
// ---------------------------------------------------------------
