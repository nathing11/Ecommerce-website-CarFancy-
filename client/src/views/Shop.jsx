import '../styles/catheg.css'
import '../styles/shop.css'
import { Link } from 'react-router-dom';
import addCircle from '/images/add_circle.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
const Shops = ({loggedUser}) => {
    const [items, setItems] = useState(null);
    const [filtredItems, setFiltredItems] = useState(null)
    console.log(items)
    useEffect(() => {
        axios.get('http://localhost:8000/api/item').then(res => {
            setItems(res.data);
            setFiltredItems(res.data);
        }).catch(err => console.log(err));
    }, [])
    const chooseOption = option => {
        const filterdItemss = filtredItems.filter((item) => item.type === option);
        setItems(filterdItemss);
    };
    return (
        <>
        <Navbar loggedUser={loggedUser}/>
        <div className='shop-container'>
            <div className='sidebarr'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" name='search' id='srch' placeholder='Search' className='form-control' style={{ width: '150px', height: '30px' }} />
                    <a href="#cart" className="icon"><img src="/images/recherch.png" alt="" /></a>
                </div>
                <button  className='button text-dark'   onClick={() => chooseOption('t-shirt')}><i></i>TShirts</button>
                <button  className='button text-dark'   onClick={() => chooseOption('carAccessorie')}><i></i>Car Accessories</button>
                <button  className='button text-dark'   onClick={() => chooseOption('carCollectibles')}><i ></i>Car Collectibles</button>
                <button  className='button text-dark'   onClick={() => chooseOption('CarMats')} ><i></i>Car Mats</button>
                <button  className='button text-dark'   onClick={() => chooseOption('hotWheels')}><i></i>Hotwheels</button>
                <button  className='button text-dark'   onClick={() => chooseOption('new')} ><i></i>New</button>
                <button  className='button text-dark'   onClick={() => chooseOption('sweater')}><i></i>Sweater</button>
                <button  className='button text-dark'   onClick={() => chooseOption('teckDeck')} ><i></i>Tech Deck</button>
            </div>
            <div className='produit containert'>
                {items && items.map(item => {
                    return (
                        <div className="w-25" key={item._id}>
                            <Link to={`/shop/${item._id}`}>
                                <div className="untree_co-section product-section before-footer-section">
                                    <div className="container">
                                        <div data-aos="fade-up">
                                            <a className="product-item" href="#">
                                                <img src={`/images_db/${item.images[0]}`}className="img-fluid product-thumbnail" alt={item.title} />
                                                <h3 className="product-title">{item.title}</h3>
                                                <strong className="product-price">{item.price}DT</strong>
                                                <span className="icon-cross">
                                                    <img src={addCircle} className="img-fluid" alt="Cross" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    );
};
export default Shops;