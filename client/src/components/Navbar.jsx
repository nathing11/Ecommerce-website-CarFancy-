import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiUser } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import Logout from '../components/Logout';
import "../styles/main.css";

function Navbar({ loggedUser }) {
    const navRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const toggleNavbar = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    return (
        <header className="luxury-navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="brand-logo" onClick={() => setIsMenuOpen(false)}>
                    <span className="brand-name">Car Fancy</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul className="nav-list">
                        <li><Link to="/shop" className="nav-link">Shop</Link></li>
                        <li><Link to="/blog" className="nav-link">Blog</Link></li>
                        <li><Link to="/event" className="nav-link">Events</Link></li>
                    </ul>

                    <div className="nav-actions">
                        {loggedUser ? (
                            <div className="user-section">
                                <div className="user-greeting">
                                    <FiUser className="user-icon" />
                                    <span>Hi, {loggedUser.firstName}</span>
                                </div>
                                {loggedUser.role === "admin" && (
                                    <Link to="/admin/dashboard" className="admin-link">
                                        <RiDashboardLine className="admin-icon" />
                                    </Link>
                                )}
                                <Logout className="logout-btn" />
                            </div>
                        ) : (
                            <Link to="/login" className="login-btn">Sign In</Link>
                        )}
                        
                        <Link to="/cart" className="cart-btn">
                            <FiShoppingBag className="cart-icon" />
                            {cartItems.length > 0 && (
                                <span className="cart-badge">{cartItems.length}</span>
                            )}
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={toggleNavbar}>
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Mobile Navigation */}
                <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`} ref={navRef}>
                    <div className="mobile-nav-content">
                        <ul className="mobile-nav-list">
                            <li><Link to="/shop" className="mobile-nav-link" onClick={toggleNavbar}>Shop</Link></li>
                            <li><Link to="/blog" className="mobile-nav-link" onClick={toggleNavbar}>Blog</Link></li>
                            <li><Link to="/event" className="mobile-nav-link" onClick={toggleNavbar}>Events</Link></li>
                        </ul>

                        <div className="mobile-auth-section">
                            {loggedUser ? (
                                <>
                                    <div className="mobile-user-info">
                                        <FiUser className="user-icon" />
                                        <span>Welcome, {loggedUser.firstName}</span>
                                        {loggedUser.role === "admin" && (
                                            <Link to="/admin/dashboard" className="mobile-admin-link" onClick={toggleNavbar}>
                                                <RiDashboardLine className="admin-icon" />
                                                Dashboard
                                            </Link>
                                        )}
                                    </div>
                                    <Logout onClick={toggleNavbar} />
                                </>
                            ) : (
                                <Link to="/login" className="mobile-login-btn" onClick={toggleNavbar}>
                                    Sign In
                                </Link>
                            )}
                        </div>

                        <Link to="/cart" className="mobile-cart-btn" onClick={toggleNavbar}>
                            <FiShoppingBag className="cart-icon" />
                            Shopping Bag
                            {cartItems.length > 0 && (
                                <span className="mobile-cart-badge">{cartItems.length}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;