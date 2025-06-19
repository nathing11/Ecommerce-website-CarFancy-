import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../components/DataProvider';
import axios from 'axios';
import { FiShoppingCart, FiChevronLeft, FiZoomIn } from 'react-icons/fi';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';
import Navbar from '../components/Navbar';
import '../styles/OneProduct.css';

export default function OneProduct({ loggedUser }) {
    const nav = useNavigate();
    const { id } = useParams();
    const value = useContext(DataContext);
    const addCart = value.addCart;
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [zoomStyle, setZoomStyle] = useState({});
    const mainImageRef = useRef();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/item/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({ backgroundPosition: `${x}% ${y}%` });
    };

    const handleAddToCart = () => {
        addCart({ _id: product._id, quantity });
        nav('/cart');
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<RiStarFill key={i} className="star filled" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<RiStarHalfFill key={i} className="star half-filled" />);
            } else {
                stars.push(<RiStarLine key={i} className="star" />);
            }
        }
        
        return stars;
    };

    if (!product) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar loggedUser={loggedUser} />
            
            <div className="product-container">
                <button className="back-button" onClick={() => nav(-1)}>
                    <FiChevronLeft /> Back to Products
                </button>

                <div className="product-details">
                    {/* Product Images */}
                    <div className="product-gallery">
                        <div 
                            className="main-image-container"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setZoomStyle({})}
                        >
                            <div 
                                className="main-image-zoom" 
                                style={{
                                    ...zoomStyle,
                                    backgroundImage: `url(/images_db/${product.images[selectedImage]})`
                                }}
                                ref={mainImageRef}
                            >
                                <img 
                                    src={`/images_db/${product.images[selectedImage]}`} 
                                    alt={product.title}
                                    className="main-image"
                                />
                            </div>
                            <div className="zoom-hint">
                                <FiZoomIn /> Hover to zoom
                            </div>
                        </div>

                        <div className="thumbnail-container">
                            {product.images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(idx)}
                                >
                                    <img 
                                        src={`/images_db/${img}`} 
                                        alt={`${product.title} thumbnail ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <h1 className="product-title">{product.title}</h1>
                        
                        <div className="product-meta">
                            <div className="product-rating">
                                {renderRatingStars(4.5)}
                                <span className="review-count">(42 reviews)</span>
                            </div>
                            <div className="product-sku">SKU: {product._id.slice(-8).toUpperCase()}</div>
                        </div>

                        <div className="product-price">
                            DT{product.price.toFixed(2)}
                            {product.originalPrice && (
                                <span className="original-price">DT{product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>
                        <p className="product-content">{product.content}</p>

                        {/* Color Selection */}
                        <div className="product-option">
                            <h3>Color:</h3>
                            <div className="color-options">
                                {product.colors.map((color, idx) => (
                                    <div 
                                        key={idx} 
                                        className="color-option"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="product-option">
                                <h3>Size:</h3>
                                <div className="size-options">
                                    {product.sizes.map((size, idx) => (
                                        <div key={idx} className="size-option">
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="product-option">
                            <h3>Quantity:</h3>
                            <div className="quantity-selector">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            <FiShoppingCart className="cart-icon" />
                            Add to Cart
                        </button>

                        {/* Product Details */}
                        <div className="product-details-section">
                            <h3>Product Details</h3>
                            <ul>
                                <li><strong>Category:</strong> {product.type}</li>
                                <li><strong>Availability:</strong> In Stock ({product.count} items)</li>
                                <li><strong>Shipping:</strong> Free shipping on orders over DT100</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}