// Import CSS file at the top
import '../styles/BlogPost.css';
import { useEffect, useState } from 'react';
import '../styles/event.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BlogPost = ({loggedUser}) => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div><Navbar loggedUser={loggedUser}/>
      <div>
      <div className='container'>
        <section className="tm-main">
          <div className="row tm-row">
                {blogs && blogs.map(blog => (
                  <>
                    <article className="col-12 col-md-6 tm-post">
                    <hr className="tm-hr" />
                    <Link to="/post" className="effect-lily tm-post-link tm-pt-60">
                        <div className="tm-post-link-inner">
                        <img src={`/images_db/${blog.picture[0]}`} alt="Image" className="img-fluid" />
                        </div>
                        <span className="position-absolute tm-new-badge bg-danger">New</span>
                        <h2 className="tm-pt-30 text-dark tm-post-title">{blog.title}</h2>
                    </Link>
                    <p className="tm-pt-30">{blog.content}</p>
                    <div className="d-flex justify-content-between tm-pt-45">
                        <span className="tm-color-primary">Travel . Events</span>
                        <span className="tm-color-primary">June 24, 2020</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>36 comments</span>
                        <span>by Admin Nat</span>
                    </div>
                    </article>
                  </>
                ))}
            </div>
      </section>
      </div>
    </div>
    </div>
  );
};
export default BlogPost;
