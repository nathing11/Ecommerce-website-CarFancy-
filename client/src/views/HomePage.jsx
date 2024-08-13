import addCircle from '/images/add_circle.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/home.css'
import { Link } from 'react-router-dom';
const HomePage = ({loggedUser}) => {
    const [items, setItems] = useState(null);
    
    useEffect(() => {
        async function getItems() {
            try {
                const allItems = await axios.get('http://localhost:8000/api/item')
                setItems(allItems.data)
            } catch (error) {
                console.log(error)
            }
        }
        getItems();
    }, [])
    return (
        <div>
            <Navbar loggedUser={loggedUser} />
            <div className="hero">
                <video autoPlay muted id="myVideo" src="/images/bg.mp4">
                </video>
            </div>
            <div className="product-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-5 mb-5  mb-lg-0 "  data-aos="fade-right">
                            <img src="/images/image3.jpg" className=" w-100" style={{ height: '700px' }} />
                        </div>
                        {items && items.filter((item, idx) =>idx==0 || idx==1).map(item => {
                            return(
                                
                                <div key={item._id} className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0 mt-5" data-aos="fade-left">
                                    <a className="product-item" href="cart.html">
                                    <img src={`/images_db/${item.images[0]}`} className="img-fluid product-thumbnail" alt="Product 2" />
                                <h3 className="product-title">{item.title}</h3>
                                <div>
                                    <strong className="product-price">{item.price}DT</strong>
                                </div>
                                <span className="icon-cross">
                                    <img src={addCircle} className="img-fluid" alt="Cross" />
                                </span>
                            </a>
                        </div>
                            )
                        })}
                    </div>
                    <div className='row'>
                    {items && items.filter((item, idx) => idx==2 || idx==3).map(item => {
                            return(
                                <div key={item._id} className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0 mt-5" data-aos="fade-right">
                                    <a className="product-item" href="cart.html">
                                    <img src={`/images_db/${item.images[0]}`} className="img-fluid product-thumbnail" alt="Product 2" />
                                    <h3 className="product-title">{item.title}</h3>
                                <div>
                                    <strong className="product-price">{item.price}DT</strong>
                                </div>
                                <span className="icon-cross">
                                    <img src={addCircle} className="img-fluid" alt="Cross" />
                                </span>
                            </a>
                        </div>
                            )
                        })}
                        <div className="col-md-12 col-lg-5 mb-5  mb-lg-0 "data-aos="fade-left">
                            <img src="/images/ArHoodies.webp" className=" w-100" style={{ height: '700px' }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12 col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
                        <img src="/images/turbo.jpg" className=" w-100" style={{ height: '700px' }} />
                        </div>
                        {items && items.filter((item, idx) => idx==4 || idx==5).map(item => {
                            return(
                                <div key={item._id} className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0 mt-5" data-aos="fade-left">
                            <a className="product-item" href="cart.html">
                                <img src={`/images_db/${item.images[0]}`} className="img-fluid product-thumbnail" alt="Product 2" />
                                <h3 className="product-title">{item.title}</h3>
                                <div>
                                    <strong className="product-price">{item.price}DT</strong>
                                </div>
                                <span className="icon-cross">
                                    <img src={addCircle} className="img-fluid" alt="Cross" />
                                </span>
                            </a>
                        </div>
                            )

                        })}

                    </div>
                </div>
            </div>

        </div>
    );
};
export default HomePage;
