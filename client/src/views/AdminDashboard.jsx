import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiShoppingBag, FiCalendar, 
  FiEdit, FiPieChart, FiLogIn, 
  FiUserPlus, FiMenu, FiX 
} from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import AllUsersTable from '../components/AllUsersTable';
import user from '../assets/admin.png'
import '../styles/style.css';

const AdminDashboard = ({ loggedUser }) => {
    const [users, setUsers] = useState([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/user/${id}`);
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data);
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <div className={`admin-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Sidebar */}
            <div className={`admin-sidebar bg-dark ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header d-flex align-items-center justify-content-between p-3">
                    <Link to="/" className="navbar-brand text-white d-flex align-items-center">
                        <RiDashboardLine className="me-2" size={24} />
                        {!sidebarCollapsed && <span className="fw-bold">AdminPro</span>}
                    </Link>
                    <button 
                        className="btn btn-link text-white p-0"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    >
                        {sidebarCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
                    </button>
                </div>

                <div className="user-profile p-3 d-flex align-items-center">
                    <div className="position-relative me-3">
                        <img 
                            src={user} 
                            alt="Admin" 
                            className="rounded-circle" 
                            width={40} 
                            height={40}
                        />
                        <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white p-1"></span>
                    </div>
                    {!sidebarCollapsed && (
                        <div>
                            <div className="text-white fw-bold">{loggedUser?.firstName || 'Admin'}</div>
                            <small className="text-muted">Super Admin</small>
                        </div>
                    )}
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="#" className="nav-link active">
                                <RiDashboardLine className="me-3" size={18} />
                                {!sidebarCollapsed && <span>Dashboard</span>}
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                data-bs-toggle="collapse" 
                                href="#createDropdown"
                            >
                                <FiEdit className="me-3" size={18} />
                                {!sidebarCollapsed && <span>Create</span>}
                            </a>
                            <div className="collapse" id="createDropdown">
                                <ul className="nav flex-column ps-5">
                                    <li className="nav-item">
                                        <Link to="/merch" className="nav-link">
                                            <FiShoppingBag className="me-2" size={16} />
                                            {!sidebarCollapsed && <span>Merch</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/cevent" className="nav-link">
                                            <FiCalendar className="me-2" size={16} />
                                            {!sidebarCollapsed && <span>Event</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/cblog" className="nav-link">
                                            <FiEdit className="me-2" size={16} />
                                            {!sidebarCollapsed && <span>Blog</span>}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                <FiPieChart className="me-3" size={18} />
                                {!sidebarCollapsed && <span>Analytics</span>}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                <FiLogIn className="me-3" size={18} />
                                {!sidebarCollapsed && <span>Sign In</span>}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/registration" className="nav-link">
                                <FiUserPlus className="me-3" size={18} />
                                {!sidebarCollapsed && <span>Sign Up</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                {/* Top Navbar */}
                <nav className="navbar navbar-expand bg-light navbar-light sticky-top shadow-sm">
                    <div className="container-fluid">
                        <button 
                            className="navbar-toggler border-0" 
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <FiMenu size={20} />
                        </button>
                        <div className="navbar-nav ms-auto">
                            <div className="nav-item dropdown">
                                <a 
                                    href="#" 
                                    className="nav-link dropdown-toggle" 
                                    data-bs-toggle="dropdown"
                                >
                                    <img 
                                        src={user} 
                                        alt="User" 
                                        className="rounded-circle me-2" 
                                        width={32}
                                    />
                                    <span className="d-none d-lg-inline">Admin</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="container-fluid p-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                            <h5 className="mb-0">User Management</h5>
                            <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Data
                            </button>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading users...</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <AllUsersTable users={users} onDelete={handleDelete} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;