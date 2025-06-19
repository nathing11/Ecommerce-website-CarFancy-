import { DataContext } from "../components/DataProvider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getItems() {
      try {
        const itemIds = cart.map((element) => element._id);
        if (itemIds.length > 0) {
          const response = await axios.get("http://localhost:8000/api/item");
          const allItems = response.data.filter((item) =>
            itemIds.includes(item._id)
          );
          setProducts(allItems);
          
          // Initialize quantities
          const initialQuantities = {};
          allItems.forEach(item => {
            initialQuantities[item._id] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }

    getItems();
  }, [cart]);

  useEffect(() => {
    // Calculate total whenever quantities or products change
    let newTotal = 0;
    products.forEach(product => {
      newTotal += product.price * (quantities[product._id] || 1);
    });
    setTotal(newTotal);
  }, [quantities, products]);

  const updateQuantity = (productId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQuantity)
    }));
  };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    
    // Remove from quantities state
    setQuantities(prev => {
      const newQuantities = {...prev};
      delete newQuantities[productId];
      return newQuantities;
    });
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="cart-container">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="cart-title">Your Shopping Cart</h1>
          
          {products.length > 0 ? (
            <>
              <div className="cart-items">
                <AnimatePresence>
                  {products.map((product) => (
                    <motion.div
                      key={product._id}
                      className="cart-item"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div className="item-image-container">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={`/images_db/${product.images}`}
                          alt={product.title}
                          className="item-image"
                        />
                      </div>
                      
                      <div className="item-details">
                        <h3 className="item-title">{product.title}</h3>
                        <p className="item-description">{product.description}</p>
                        <div className="item-price">${product.price.toFixed(2)}</div>
                        
                        <div className="quantity-controls">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="quantity-btn"
                            onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) - 1)}
                          >
                            -
                          </motion.button>
                          <span className="quantity-value">{quantities[product._id] || 1}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="quantity-btn"
                            onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) + 1)}
                          >
                            +
                          </motion.button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="remove-btn"
                          onClick={() => removeProduct(product._id)}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="cart-summary">
                <div className="total-section">
                  <span>Total:</span>
                  <span className="total-price">${total.toFixed(2)}</span>
                </div>
                
                {!confirmed && (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="checkout-btn"
                    onClick={handleConfirm}
                  >
                    Proceed to Checkout
                  </motion.button>
                )}
                
                <Link to="/shop" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
              
              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="payment-section"
                >
                  <Payment 
                    pquantity={quantities} 
                    products={products} 
                    removeProduct={removeProduct}
                    total={total}
                  />
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-cart"
            >
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet</p>
              <Link to="/shop" className="shop-btn">
                Start Shopping
              </Link>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;