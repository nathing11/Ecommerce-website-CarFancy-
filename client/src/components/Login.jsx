import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";
const Login = ({setLoggedUser}) => {
    const nav = useNavigate();
    const [errors, setErrors] = useState({ email: '', password: '' })
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const formHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            console.log('SERVER RESPONSE:', response.data)
            localStorage.setItem('token', response.data.token)
            setLoggedUser(response.data)
            nav('/shop')
        } catch (error) {
            console.log("Error:", error);
            let tempErrors = {}
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message
            }
            setErrors({ ...tempErrors })
        }
    };
    const goBack = () => {
        nav(-1);
    };
    return (
        <div style={{ backgroundColor: '#666666' }}>
            <div className="limiter">
                <div className="limiter">
                    <div className="wrap-login100">
                    <div
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                padding: '10px',
                                background: '#2196F3',
                                color: 'white',
                                borderRadius: '5px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                            }}
                            onClick={goBack}
                        >
                            {'< Go Back'}
                        </div>
                        <form onSubmit={formHandler} className="login100-form validate-form">
                        <span className="login100-form-title p-b-43 mb-5">
                            Login
                        </span>
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input
                                    type="text"
                                    className="input100"
                                    value={user.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Email</span>
                            </div>
                            {errors && errors.email && <div className="error-message">{errors.email}</div>}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input
                                    type="password"
                                    className="input100"
                                    value={user.password}
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Password</span>
                            </div>
                            
                            {errors && errors.password && <div className="error-message">{errors.password}</div>}
                            <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type='submit' >Sign In</button>
                            </div>
                            <div className='mt-1'>
                                <Link to={'/registration'} className="txt1">
                                or sign up using
                                </Link>
                            </div>
                </form>
                <div className="login100-more" style={{ backgroundImage: "url('images/bg-01.jpg')" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
