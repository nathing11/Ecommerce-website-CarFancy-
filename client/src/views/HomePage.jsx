import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const HomePage = ({ loggedUser }) => {
    const [items, setItems] = useState(null);
    useEffect(() => {
        async function getItems() {
            try {
                const allItems = await axios.get('http://localhost:8000/api/item');
                setItems(allItems.data);
            } catch (error) {
                console.log(error);
            }
        }
        getItems();
    }, []);
    return (
        <div className="luxury-car-showroom">
            <Navbar loggedUser={loggedUser} isTransparent={true} />
            {/* Hero Section */}
            <section className="cinematic-hero">
                <div className="video-backdrop">
                    <video autoPlay muted loop playsInline className="hero-video">
                        <source src="/images/bg.mp4" type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-titles" data-aos="fade-up">
                        <h1 className="hero-main-title">
                            <span className="title-line">CarFancy</span>
                            <span className="title-line">Drive With Style</span>
                        </h1>
                        <p className="hero-subtitle">Accessoires modernes, vêtements et événements drift</p>
                    </div>
                    <div className="hero-scroll-hint">
                        <span>Explorez notre univers</span>
                        <div className="scroll-icon"></div>
                    </div>
                </div>
            </section>
            {/* Collections Section */}
            <section className="collections-section">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Catégories Populaires</h2>
                    <p className="section-description">Ce que nos clients adorent</p>
                </div>
                <div className="collections-grid">
                    <div className="collection-card grand-tourisme" data-aos="fade-up">
                        <div className="collection-overlay"></div>
                        <div className="collection-content">
                            <h3>Accessoires Voiture</h3>
                            <p>Design et performance réunis</p>
                            <button className="collection-cta">Découvrir</button>
                        </div>
                    </div>
                    <div className="collection-card hypercars" data-aos="fade-up" data-aos-delay="100">
                        <div className="collection-overlay"></div>
                        <div className="collection-content">
                            <h3>T-Shirts Drift</h3>
                            <p>Style et passion automobile</p>
                            <button className="collection-cta">Explorer</button>
                        </div>
                    </div>
                    <div className="collection-card suv-luxe" data-aos="fade-up" data-aos-delay="200">
                        <div className="collection-overlay"></div>
                        <div className="collection-content">
                            <h3>Événements & Blog</h3>
                            <p>Restez informé des nouveautés drift</p>
                            <button className="collection-cta">Voir</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured Products */}
            <section className="featured-vehicles">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Produits en Vedette</h2>
                    <p className="section-description">Sélection spéciale de nos meilleurs articles</p>
                </div>
                <div className="vehicle-showcase">
                    {items && items.filter((item, idx) => idx < 2).map((item, index) => (
                        <div key={item._id} className="vehicle-card" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="vehicle-media">
                                {index < 2 && (
                                    <div className="vehicle-badge">
                                        {index === 0 ? 'Nouveauté' : 'Édition Limitée'}
                                    </div>
                                )}
                                <img
                                    src={`/images_db/${item.images[0]}`}
                                    alt={item.title}
                                    className="vehicle-image"
                                />
                                <button className="quick-view-button">
                                    <i className="icon-eye"></i> Aperçu
                                </button>
                            </div>
                            <div className="vehicle-details">
                                <div className="vehicle-info">
                                    <h3 className="vehicle-name">{item.title}</h3>
                                    <div className="vehicle-specs">
                                        {item.specs?.map((spec, i) => (
                                            <span key={i}>{spec}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="vehicle-pricing">
                                    <div className="price">{item.price.toLocaleString()} DT</div>
                                    <button className="configure-button">
                                        <i className="icon-cart"></i> Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all-container">
                    <Link to="/shop" className="view-all-button">Voir Tous les Produits</Link>
                </div>
            </section>
            {/* Footer */}
            <footer className="luxury-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">Car<span>Fancy</span></div>
                        <p>Votre passion automobile depuis 2023</p>
                    </div>
                    <div className="footer-links">
                        <div className="links-column">
                            <h4>Boutique</h4>
                            <a href="#">Nouveautés</a>
                            <a href="#">Accessoires</a>
                            <a href="#">Événements</a>
                        </div>
                        <div className="links-column">
                            <h4>Services</h4>
                            <a href="#">Livraison</a>
                            <a href="#">Paiement sécurisé</a>
                            <a href="#">Retours</a>
                        </div>
                        <div className="links-column">
                            <h4>À propos</h4>
                            <a href="#">Contact</a>
                            <a href="#">FAQ</a>
                            <a href="#">Notre histoire</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="social-links">
                        <a href="#"><i className="icon-instagram"></i></a>
                        <a href="#"><i className="icon-facebook"></i></a>
                        <a href="#"><i className="icon-youtube"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default HomePage;
