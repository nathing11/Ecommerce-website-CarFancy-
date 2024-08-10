import { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataContext } from '../components/DataProvider';
import axios from 'axios'
import '../styles/oneProduct.css'
import {css} from '@emotion/css'
import Navbar from '../components/Navbar';
export default function OneProduct({loggedUser}) {
    const nav = useNavigate()
    const { id } = useParams();
    const value = useContext(DataContext)
    const addCart = value.addCart
    const [product,setProduct] = useState(null)
    const imgDiv = useRef();
    const [img,setImg]=useState(null)
    useEffect(()=>{
        axios.get('http://localhost:8000/api/item/'+id).then(res=>setProduct(res.data)).catch(err=>console.log(err))
    },[id]);
    const changeImg=(url)=>{
        setImg(url)
    }
    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }
    return (
        <>
        <Navbar loggedUser={loggedUser}/>
            {
                product && (
                    <div className="details" key={product._id}>
                        {/* {img?<img style={{width:"300px", height:"420px"}} src={`/images_db/${img}`} alt="" />:<img src={`/images_db/${product.images[0]}`}/>} */}
                        {/* <img style={{ width: "200px", height: "280px" }} src={`/images_db/${img}`} alt="" /> */}
                        {img ? (
                            <img style={{ width: "150px", height: "210px" }} src={`/images_db/${img}`} alt="" />
                            ) : (
                            <img style={{ maxWidth: "40%", maxHeight: "50%" }} src={`/images_db/${product.images[0]}`} alt="" />
                            )}
                        <div className="box-details">
                            <h2 title={product.title}>{product.title}</h2>
                            <h3>DT{product.price}</h3>
                            {product.colors.map((color,idx)=>{
                                return(
                                    <div key={idx} style={{background:color, height:'10px',width:'10px'}}></div>
                                )
                            })}
                            {product.sizes && product.sizes.map((size,idx)=>{
                                return <p key={idx}>{size}</p>
                            })}
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className={css`
                                    display:flex;
                                    gap:10px;
                                    align-items:center;`}>
                            {product.images.map((img,idx)=>{
                                return (
                                        <img key={idx}onClick={()=>changeImg(img)} className={css` height:50px;
                                        width:50px`} src={`/images_db/${img}`} alt="" />
                                )
                            })}</div>
                            <button to="/cart" className="cart" onClick={() => { addCart({_id:product._id, quantity:1}); nav('/cart')}}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
