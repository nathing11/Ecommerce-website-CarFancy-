import { Route, Routes } from "react-router-dom";
import { useEffect,useState } from "react";
import Login from "./components/Login";
import AdminDashboard from "./views/AdminDashboard";
import { DataProvider } from "./components/DataProvider";
import Footer from "./components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OneProduct from "./views/OneProduct";
import Shops from "./views/Shop";
import Cart from "./views/Cart";
import Event from './views/Event'
import Registration from "./components/Registration";
import BlogPost from "./views/BlogPost";
import Post from "./views/Post";
import axios from "axios";
import HomePage from "./views/HomePage";
import CreateMerch from "./components/CreateMerch";
import CreateEvent from "./components/CreateEvent";
import BlogCreate from "./components/CreateBlog";
function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, [])
  const [loggedUser, setLoggedUser] = useState(null); // Initialize loggedUser state
  const token = localStorage.getItem('token')
  useEffect(() => {
    const GetLoggedUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
        console.log('Server Response:', response);
        const { token, loggedUser } = response.data;
        setLoggedUser(loggedUser);
      } catch (error) {
        console.log('Frontend Request Error:', error);
      }
    };
    if (token) {
      GetLoggedUser();
    }
  }, [token]);
  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<HomePage loggedUser={loggedUser} />} />
          <Route path="/login" element={<Login setLoggedUser={setLoggedUser}/>} />
          <Route path="/registration" element={<Registration setLoggedUser={setLoggedUser}/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/shop" element={<Shops loggedUser={loggedUser}/>} />
          <Route path='/shop/:id' element={<OneProduct loggedUser={loggedUser}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/event" element={<Event loggedUser={loggedUser}/>} />
          <Route path="/blog" element={<BlogPost loggedUser={loggedUser}/>} />
          <Route path="/post" element={<Post/>} />
          <Route path="/merch" element={<CreateMerch/>}/>
          <Route path="/cevent" element={<CreateEvent/>}/>
          <Route path="/cblog" element={<BlogCreate/>}/>
        </Routes>
        <Footer />
      </DataProvider>
    </>
  )
}
export default App
