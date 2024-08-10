import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = ({setLoggedUser}) => {
    const nav = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPW: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPW: '' })
    const formHandler = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/register', user,{withCredentials:true})
            console.log('SERVER RESPONSE:', response.data)
            localStorage.setItem('token',response.data.token)
            setLoggedUser(response.data)
            nav('/shop')
        } catch (error) {
            console.log("Error:", error.response.data);
            let tempErrors = {}
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message
            }
            setErrors({ ...tempErrors })
        }
    };
    return (
        <div style={{ backgroundColor: '#666666' }}>
            <div className="limiter">
                <div className="limiter">
                    <div className="wrap-login100">
                    <form onSubmit={formHandler} className="login100-form validate-form">
                <div className="wrapper">
                <span className="login100-form-title p-b-43 mb-5">
                Register
                </span>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="text"
                                className="input100"
                                value={user.firstName}
                                onChange={e => setUser({ ...user, firstName: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">First Name</span>
                        </div>
                        {errors && (errors.firstName && (<li style={{ color: 'red' }}>{errors.firstName}</li>))}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="text"
                                className="input100"
                                value={user.lastName}
                                onChange={e => setUser({ ...user, lastName: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Laste Name</span>
                        </div>
                        {errors && (errors.lastName && (<li style={{ color: 'red' }}>{errors.lastName}</li>))}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="password"
                                className="input100"
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Password</span>
                        </div>
                        {errors && (errors.password && (<li style={{ color: 'red' }}>{errors.password}</li>))}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="password"
                                className="input100"
                                value={user.confirmPW}
                                onChange={e => setUser({ ...user, confirmPW: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Confirm Password</span>
                        </div>
                        {errors && (errors.confirmPW && (<li style={{ color: 'red' }}>{errors.confirmPW}</li>))}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="text"
                                className="input100"
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Email Address</span>
                        </div>
                        {errors && (errors.email && (<li style={{ color: 'red' }}>{errors.email}</li>))}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input type="number"
                                className="input100"
                                value={user.phoneNumber}
                                onChange={e => setUser({ ...user, phoneNumber: e.target.value })} />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Phone Number</span>
                        </div>
                        {errors && (errors.phoneNumber && (<li style={{ color: 'red' }}>{errors.phoneNumber}</li>))}
                    <div className="container-login100-form-btn">
                    <button className="login100-form-btn" type='submit'>sign Up</button>
                    </div>
                </div>
            </form>
            <div className="login100-more" style={{ backgroundImage: "url('images/bg-01.jpg')" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
