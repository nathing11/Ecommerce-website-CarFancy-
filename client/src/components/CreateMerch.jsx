import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import user from '../assets/admin.png';
import { SketchPicker } from 'react-color';
import '../styles/style.css';
import { RiDashboardLine } from "react-icons/ri";
import {
    FiUsers, FiShoppingBag, FiCalendar,
    FiEdit, FiPieChart, FiLogIn,
    FiUserPlus, FiMenu, FiX, FiPlus, FiUpload, FiDollarSign, FiCheck
} from "react-icons/fi";
const CreateMerch = ({ loggedUser }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        colors: [],
        sizes: [],
        price: '',
        count: '',
        images: [],
        type: ''
    });
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const handleColorChange = (color) => {
        const selectedColor = color.hex;

        setFormData((prevData) => ({
            ...prevData,
            colors: prevData.colors.includes(selectedColor)
                ? prevData.colors.filter((color) => color !== selectedColor)
                : [...prevData.colors, selectedColor]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, (option) => option.value);

        setFormData((prevData) => ({
            ...prevData,
            sizes: selectedSizes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("type", formData.type);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("count", formData.count);
        data.append("colors", JSON.stringify(formData.colors)); // Serialize array
        data.append("sizes", JSON.stringify(formData.sizes)); // Serialize array

        for (let i = 0; i < formData.images.length; i++) {
            data.append('files', formData.images[i]);
        }

        axios.post('http://localhost:8000/api/item', data)
            .then(result => console.log(result))
            .catch(err => console.error('Error occurred:', err.response ? err.response.data : err));
    };
    return (
        <div>
            <div className={`admin-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
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
            <div className="admin-content">
                <nav className="top-nav">
                    <button
                        className="mobile-toggle"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    >
                        <FiMenu />
                    </button>
                    <div className="user-menu">
                        <img src={user} alt="Admin" className="avatar" />
                        <span>Admin</span>
                    </div>
                </nav>

                <div className="content-area">
                    <div className="form-container">
                        <div className="form-header">
                            <FiPlus className="icon" />
                            <h2>Create New Product</h2>
                        </div>

                        {submitSuccess && (
                            <div className="success-message">
                                Product created successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>

                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiEdit className="icon" />
                                    Product Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select product type</option>
                                    <option value="t-shirt">T-shirt</option>
                                    <option value="carAccessorie">Car Accessorie</option>
                                    <option value="carCollectibles">Car Collectibles</option>
                                    <option value="CarMats">Car Mats</option>
                                    <option value="hotWheels">Hot Wheels</option>
                                    <option value="new">New Arrivals</option>
                                    <option value="sweater">Sweater</option>
                                    <option value="teckDeck">Teck Deck</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiUpload className="icon" />
                                    Product Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={e => setFormData({ ...formData, images: e.target.files })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiEdit className="icon" />
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group color-picker">
                                <label>
                                    <FiEdit className="icon" />
                                    Available Colors
                                </label>
                                <SketchPicker
                                    color={formData.colors[0] || '#ffffff'}
                                    onChange={handleColorChange}
                                />
                                {formData.colors.length > 0 && (
                                    <div className="color-badges">
                                        {formData.colors.map(color => (
                                            <span
                                                key={color}
                                                className="color-badge"
                                                style={{ backgroundColor: color }}
                                            ></span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiEdit className="icon" />
                                    Available Sizes
                                </label>
                                <select
                                    multiple
                                    name="sizes"
                                    value={formData.sizes}
                                    onChange={handleSizeChange}
                                    required
                                >
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                    <option value="XXXL">XXXL</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiDollarSign className="icon" />
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FiEdit className="icon" />
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    name="count"
                                    value={formData.count}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="spinner"></span>
                                ) : (
                                    <FiCheck className="icon" />
                                )}
                                Create Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CreateMerch;

{/* <form onSubmit={handleSubmit}>
            <h3 className="titel">Create a Merch</h3>
                <label className="label">Title</label>
                <input
                className="inp"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Insert title for the merch"
                />
                <label className="label">Type</label>
                <select name="types" placeholder='type of the merch' onChange={e=>setFormData({...formData,type:e.target.value})}>
                    <option value="t-shirt">T-shirt</option>
                    <option value="carAccessorie">carAccessorie</option>
                    <option value="carCollectibles">carCollectibles</option>
                    <option value="CarMats">CarMats</option>
                    <option value="hotWheels">hotWheels</option>
                    <option value="new">new</option>
                    <option value="sweater">sweater</option>
                    <option value="teckDeck">teckDeck</option>
                </select>
                <label className="label">Pictures</label>
                <input type="file" multiple max='4' className="inp" onChange={e=>setFormData({...formData,images:e.target.files})} />

                <label className="label">Description</label>
                <textarea
                className="textt"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Put description for the merch"
                    id=""
                    cols="30"
                    rows="10"
                ></textarea>
                <label className="label">Colors available</label>
                <SketchPicker
                    color={formData.colors.length > 0 ? formData.colors[0] : '#ffffff'}
                    onChange={handleColorChange}
                />
                <p>Selected Colors: {formData.colors.join(', ')}</p>
                <label className="label">Sizes for the merch</label>
                <select name="sizes" multiple value={formData.sizes} onChange={handleSizeChange}
                >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL"></option>
                </select>
                <label>Price</label>
                <input
                className="inp"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder='put a price'
                />
                <label className="label">Count</label>
                <input
                className="inp" type="number" name="count" value={formData.count} onChange={handleInputChange} placeholder='put the quantity available for the product'
                />
                <button type="submit" className="btn">Make the product</button>
            </form> */}