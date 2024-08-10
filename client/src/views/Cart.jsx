import { DataContext } from "../components/DataProvider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import { Link } from "react-router-dom";
const Cart = () => {
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quatity, setQuatity] = useState(1);
  const [thisProducts, setThisProducts] = useState(products);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    async function getItems() {
      try {
        console.log("****************", cart);
        const itemIds = cart.map((element) => element._id);
        if (itemIds.length > 0) {
          const response = await axios.get("http://localhost:8000/api/item");
          const allItems = response.data.filter((item) =>
            itemIds.includes(item._id)
          );
          setProducts(allItems);
          setThisProducts(allItems);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        // Handle the error here (show a user-friendly message or log it)
      } finally {
        setLoading(false);
      }
    }

    getItems();
  }, [cart]);
  console.log("44444444444444", cart,"444444444444",products)
  const reduction = () => {
    if (quatity > 0) {
      setQuatity(quatity - 1);
    }
  };
  const increase = (q) => {
    if (quatity < q) {
      setQuatity(quatity + 1);
    }
  };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  const handleConfirm = () => {
    console.log("Confirm button clicked. Implement your logic here.");
    setConfirmed(true);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && thisProducts.length > 0 ? (
        thisProducts.map((product) => (
          <div className="details cart" key={product._id}>
            <div
              className="img-container"
              style={{ backgroundImage: `url(${product.images})` }}
            >
              <img
                style={{ maxWidth: "40%", maxHeight: "50%" }}
                src={`/images_db/${product.images}`}
                calt=""
              />
            </div>
            <div className="box-details">
              <h2 title={product.title}>{product.title}</h2>
              <h3 className="price">{product.price} DT</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <div className="amount">
                <button className="count" onClick={() => reduction()}>
                  {" "}
                  -{" "}
                </button>
                <span>{quatity}</span>
                <button
                  className="count"
                  onClick={() => increase(product.count)}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <Link to="/shop"
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                Go Back
              </Link>
            </div>
            {cart.length > 0 && !confirmed && (
              <div className="confirmation">
                <button onClick={handleConfirm}>
                  Confirm and Proceed to Payment
                </button>
              </div>
            )}

            {confirmed && <Payment pquantity={quatity} product={product} removeProduct={removeProduct}/>}
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
