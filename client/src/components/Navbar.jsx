import { useRef, useState } from 'react';
import "../styles/catheg.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../styles/main.css";
import user from '../assets/admin.png'
import Logout from '../components/Logout'


function Navbar({loggedUser}) {
    const navRef = useRef();
    const ShowNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    const [cartstatus, setCartStatus] = useState(JSON.parse(localStorage.getItem('cart')));
    return (
        <header className='navbar-home'>
          <Link to="/"><img src="/images/logo.png" alt="" className='logod'/></Link>
          <nav ref={navRef} className='link'>
              <Link to="/shop" className='nav-link'>Shop</Link>
              <Link to="/blog" className='nav-link'>Blog</Link>
              <Link to="/event" className='nav-link'>Event</Link>
              {/* <Link to="/login" className='nav-link'>Login</Link> */}
              {/*  */}
              {loggedUser ? (
              <>
                <p className="nav-link">{loggedUser.firstName} </p>
                <Logout />
                {loggedUser.role === "admin" ? (
                <Link to={"/admin/dashboard"}> <img className="nav-link" src={user} width={50}/></Link>) : (null)}
              </>
            ) : (
              <>
              <Link to="/login" className='nav-link'>Login</Link>
              </>
            )}
            {/*  */}
            <div className="search-bar" style={{ marginLeft: '95%' }}>
                        {/* <form action="" className="ic"> */}
                            <Link to="/cart" className="icon">
                                <img src='/images/panier.png' alt="" />
                            </Link>
                            {cartstatus && (<p>{cartstatus.length}</p>)}
                        {/* </form> */}
            </div>
            <button onClick={ShowNavbar} className='nav-btn nav-close-btn'><FaTimes/></button>
        </nav>
            <button onClick={ShowNavbar} className='nav-btn'>
                <FaBars />
            </button>
        </header>
    )
}
export default Navbar