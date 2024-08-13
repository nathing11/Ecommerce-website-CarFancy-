import { useState } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { Link } from 'react-router-dom';
import user from '../assets/admin.png'
const CreateMerch = () => {
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
                    <Link to="/admin/dashboard" className="nav-item nav-link active"><i className="fa fa-dashboard me-2"></i>Dashboard</Link>
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
                        <form onSubmit={handleSubmit}>
                            <div className="col-sm-12 col-xl-6">
                                <div className="bg-light rounded h-100 p-4">
                                    <h6 className="mb-4">Create a Merch</h6>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Title</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-describedby="basic-addon1"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            name="type"
                                            id="floatingSelect"
                                            aria-label="Floating label select example"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Open this select menu</option>
                                            <option value="t-shirt">T-shirt</option>
                                            <option value="carAccessorie">Car Accessorie</option>
                                            <option value="carCollectibles">Car Collectibles</option>
                                            <option value="CarMats">Car Mats</option>
                                            <option value="hotWheels">Hot Wheels</option>
                                            <option value="new">New</option>
                                            <option value="sweater">Sweater</option>
                                            <option value="teckDeck">Teck Deck</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Type</label>
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            className="form-control form-control-lg"
                                            id="formFileLg"
                                            type="file"
                                            multiple
                                            onChange={e => setFormData({...formData, images: e.target.files})}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text">Description</span>
                                        <textarea
                                            className="form-control"
                                            aria-label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="input-group mb-3 mt-3">
                                        <span className="label me-3">Colors available</span>
                                        <SketchPicker
                                            color={formData.colors.length > 0 ? formData.colors[0] : '#ffffff'}
                                            onChange={handleColorChange}
                                        />
                                        <p className="mt-3 ms-3">Selected Colors: {formData.colors.join(', ')}</p>
                                    </div>
                                    <div className="input-group mb-3">
                                        <h6 className="me-4">Select Sizes for the merch</h6>
                                        <select
                                            className="form-select"
                                            multiple
                                            aria-label="multiple select example"
                                            name="sizes"
                                            value={formData.sizes}
                                            onChange={handleSizeChange}
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
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Price</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            aria-label="Amount (to the nearest dollar)"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                        <span className="input-group-text">.00 $</span>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Count</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-describedby="basic-addon1"
                                            name="count"
                                            value={formData.count}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary ms-5">Make the product</button>
                                </div>
                            </div>
                        </form>
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