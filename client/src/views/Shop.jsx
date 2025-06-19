import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiHeart, FiShoppingBag, FiX, FiChevronDown } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import '../styles/shop.css';
const Shops = ({ loggedUser }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/item');
                setProducts(response.data);
                setFilteredProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let results = products;

        // Apply category filter
        if (activeCategory !== 'all') {
            results = results.filter(product => product.type === activeCategory);
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(product =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(results);
    }, [activeCategory, searchQuery, products]);

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 't-shirt', name: 'Premium Tees' },
        { id: 'carAccessorie', name: 'Car Accessories' },
        { id: 'carCollectibles', name: 'Collectibles' },
        { id: 'CarMats', name: 'Luxury Mats' },
        { id: 'hotWheels', name: 'Hotwheels' },
        { id: 'new', name: 'New Arrivals' },
        { id: 'sweater', name: 'Performance Wear' },
        { id: 'teckDeck', name: 'Tech Gear' }
    ];

    const toggleMobileFilters = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    return (
        <div className="modern-shop">
            <Navbar loggedUser={loggedUser} />

            {/* Hero Section */}
            <section className="shop-hero">
                <div className="hero-content">
                    <h1>Drive Your Style</h1>
                    <p>Premium automotive accessories & apparel</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="shop-container">
                {/* Mobile Filter Toggle */}
                <button className="mobile-filter-toggle" onClick={toggleMobileFilters}>
                    <span>Filters</span>
                    <FiChevronDown className={`chevron ${isMobileFilterOpen ? 'open' : ''}`} />
                </button>

                {/* Sidebar Filters */}
                <aside className={`shop-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
                    <div className="search-box">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-section">
                        <h3>Categories</h3>
                        <ul className="category-list">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <button
                                        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setIsMobileFilterOpen(false);
                                        }}
                                    >
                                        {category.name}
                                        <span className="product-count">
                                            {category.id === 'all'
                                                ? products.length
                                                : products.filter(p => p.type === category.id).length}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="product-grid">
                    {isLoading ? (
                        <div className="loading-state">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="product-card loading"></div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <article className="product-card" key={product._id}>
                                <div className="product-media">
                                    <Link to={`/shop/${product._id}`}>
                                        <img
                                            src={`/images_db/${product.images[0]}`}
                                            alt={product.title}
                                            className="product-image"
                                        />
                                    </Link>

                                    {product.type === 'new' && (
                                        <span className="product-badge">New</span>
                                    )}

                                    <button
                                        className="quick-view-btn"
                                        onClick={() => setQuickViewProduct(product)}
                                    >
                                        Quick View
                                    </button>

                                    <button className="wishlist-btn">
                                        <FiHeart />
                                    </button>
                                </div>

                                <div className="product-info">
                                    <Link to={`/shop/${product._id}`} className="product-link">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p className="product-category">{product.type}</p>
                                    </Link>

                                    <div className="product-footer">
                                        <span className="product-price">{product.price} DT</span>
                                        <button className="add-to-cart">
                                            <FiShoppingBag />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">🚗</div>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                            <button
                                className="reset-btn"
                                onClick={() => {
                                    setActiveCategory('all');
                                    setSearchQuery('');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <div className="quick-view-modal">
                    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}></div>

                    <div className="modal-content">
                        <button
                            className="close-modal"
                            onClick={() => setQuickViewProduct(null)}
                        >
                            <FiX />
                        </button>

                        <div className="modal-product">
                            <div className="modal-media">
                                <img
                                    src={`/images_db/${quickViewProduct.images[0]}`}
                                    alt={quickViewProduct.title}
                                    className="modal-image"
                                />
                            </div>

                            <div className="modal-details">
                                <h2>{quickViewProduct.title}</h2>
                                <span className="modal-price">{quickViewProduct.price} DT</span>
                                <p className="modal-description">{quickViewProduct.description}</p>

                                <div className="modal-actions">
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                    <Link
                                        to={`/shop/${quickViewProduct._id}`}
                                        className="view-details-btn"
                                        onClick={() => setQuickViewProduct(null)}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shops;