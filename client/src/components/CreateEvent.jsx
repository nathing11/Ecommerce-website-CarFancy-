import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import user from '../assets/admin.png'
const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        datetime: '',
        picture: []
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < eventData.picture.length; i++) {
            formData.append('files', eventData.picture[i]);
        }
        formData.append("content", eventData.description);
        formData.append("title", eventData.title);
        formData.append("datetime", eventData.datetime);

        axios.post('http://localhost:8000/api/event', formData)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };

    const isFutureDate = (dateString) => {
        const enteredDate = new Date(dateString);
        const currentDate = new Date();
        return enteredDate > currentDate;
    };

    const isFormValid = () => {
        return isFutureDate(eventData.datetime);
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
                                <h5 className="mb-4">Write an event</h5>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" name="title" value={eventData.title} onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Description</span>
                                    <textarea className="form-control" aria-label="Description" name="description" value={eventData.description} onChange={handleInputChange}></textarea>
                                </div>
                                <div className="mb-3 mt-3">
                                    <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={e => setEventData({ ...eventData, picture: e.target.files })} />
                                </div>
                                <div className='mb-3'>
                                    <input className="form-control" type="date" name="datetime" value={eventData.datetime} onChange={(e) => {
                                        const newDateTime = e.target.value;
                                        if (isFutureDate(newDateTime)) {
                                            handleInputChange(e);
                                        } else {
                                            setErrorMessage('Please select a future date and time.');
                                        }
                                    }} />
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-3" disabled={!isFormValid()}>Make Event</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
