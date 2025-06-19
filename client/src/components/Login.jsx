import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";

const Login = ({setLoggedUser}) => {
    const nav = useNavigate();
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isHovering, setIsHovering] = useState(false);

    // Même fonction exactement
    const formHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', user, { withCredentials: true });
            console.log('SERVER RESPONSE:', response.data);
            localStorage.setItem('token', response.data.token);
            setLoggedUser(response.data);
            nav('/shop');
        } catch (error) {
            console.log("Error:", error);
            let tempErrors = {};
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message;
            }
            setErrors({ ...tempErrors });
        }
    };

    // Même fonction exactement
    const goBack = () => {
        nav(-1);
    };

    return (
        <div className="login-page-wrapper">
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        {/* Bouton Go Back avec effet hover amélioré */}
                        <div
                            className="go-back-btn"
                            onClick={goBack}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {isHovering ? (
                                <span className="go-back-icon">←</span>
                            ) : null}
                            {' Go Back'}
                        </div>

                        {/* Formulaire avec mêmes fonctions mais design amélioré */}
                        <form onSubmit={formHandler} className="login100-form">
                            <span className="login100-form-title">
                                <span className="title-gradient">Welcome Back</span>
                            </span>

                            {/* Champ Email - Même structure */}
                            <div className="wrap-input100" data-validate="Valid email is required">
                                <input
                                    type="text"
                                    className="input100"
                                    value={user.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Email</span>
                                {errors.email && (
                                    <div className="error-message animate-shake">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Champ Password - Même structure */}
                            <div className="wrap-input100" data-validate="Password is required">
                                <input
                                    type="password"
                                    className="input100"
                                    value={user.password}
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Password</span>
                                {errors.password && (
                                    <div className="error-message animate-shake">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Bouton Submit - Même fonction mais design amélioré */}
                            <div className="container-login100-form-btn">
                                <button 
                                    className="login100-form-btn pulse-on-hover" 
                                    type="submit"
                                >
                                    <span className="btn-text">Sign In</span>
                                    <span className="btn-loading">
                                        <div className="loading-dots">
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                        </div>
                                    </span>
                                </button>
                            </div>

                            {/* Lien Sign Up - Même structure */}
                            <div className="text-center mt-3">
                                <Link to={'/registration'} className="txt1 hover-underline">
                                    Don't have an account? <span className="highlight-text">Sign up</span>
                                </Link>
                            </div>
                        </form>

                        {/* Section Image avec overlay amélioré */}
                        <div 
                            className="login100-more" 
                            style={{ 
                                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/ecommerce-bg.jpg')"
                            }}
                        >
                            <div className="hero-content">
                                <h2>New to Our Shop?</h2>
                                <p>Join our community and discover exclusive deals</p>
                                <Link 
                                    to="/registration" 
                                    className="hero-register-btn"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;