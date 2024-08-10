import { useState, useEffect } from "react";
import AllUsersTable from '../components/AllUsersTable';
import '../styles/style.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import user from '../assets/admin.png'

const AdminDashboard = ({loggedUser}) => {
    const [users, setUsers] = useState([]);

    console.log(users);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleDelete = id => {
        axios.delete(`http://localhost:8000/api/user/${id}`)
            .then(() => {
                axios.get('http://localhost:8000/api/users')
                    .then((response) => setUsers(response.data))
                    .catch((error) => console.log(error));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container-xxl position-relative bg-white d-flex p-0'>
            <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fas fa-user-tie me-2"></i>Welcome</h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                        <img className="rounded-circle" src={user} width={50}/>
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                        </div>
                        <div className="ms-3">
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">
                        <a href="index.html" className="nav-item nav-link active"><i className="fa fa-dashboard me-2"></i>Dashboard</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="fa fa-edit me-2"></i>Create
                            </a>
                            <div className="dropdown-menu bg-transparent border-0">
                                <Link to="/merch" className="dropdown-item">
                                    <i className="fa fa-shopping-bag me-2"></i>Create Merch
                                </Link>
                                <Link to="/cevent" className="dropdown-item">
                                    <i className="fa fa-calendar me-2"></i>Create Event
                                </Link>
                                <Link to="/cblog" className="dropdown-item">
                                    <i className="fa fa-pencil me-2"></i>Create Blog
                                </Link>
                            </div>
                        </div>
                        <Link to="#" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Tables</Link>
                        <Link to="/login" className="nav-item nav-link"><i className="fa fa-user me-2"></i>Sign In</Link>
                        <Link to="/registration" className="nav-item nav-link"><i className="fa fa-user-plus me-2"></i>Sign Up</Link>
                    </div>
                </nav>
            </div>
            <div className='content'>
                <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                    <a href="#" className="sidebar-toggler flex-shrink-0">
                        <i className="fa fa-bars"></i>
                    </a>
                    <div className="navbar-nav align-items-center ms-auto">
                            <a href="#" className="nav-link " data-bs-toggle="dropdown">
                            <img className="rounded-circle" src={user} width={50}/>
                                <span className="d-none d-lg-inline-flex">Admin</span>
                            </a>
                    </div>
                </nav>
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-light text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Recent Sales</h6>
                        </div>
                        <div className="table-responsive">
                            <AllUsersTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
