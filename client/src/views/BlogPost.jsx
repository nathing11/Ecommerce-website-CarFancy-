import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiClock, FiMessageSquare, FiUser, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import '../styles/BlogPost.css';

const BlogPost = ({ loggedUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-container">
      <Navbar loggedUser={loggedUser} />
      
      <div className="blog-header">
        <div className="container">
          <h1 className="blog-title">Latest Articles</h1>
          <p className="blog-subtitle">Discover our collection of insightful blog posts</p>
        </div>
      </div>

      <div className="container">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog, index) => (
              <article key={index} className="blog-card">
                <div className="blog-card-header">
                  <Link to={`/post/${blog._id}`} className="blog-image-link">
                    <img 
                      src={`/images_db/${blog.picture[0]}`} 
                      alt={blog.title} 
                      className="blog-image"
                      loading="lazy"
                    />
                    {index < 2 && <span className="blog-badge">New</span>}
                  </Link>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span className="blog-category">Travel • Events</span>
                    <span className="blog-date">
                      <FiClock className="icon" /> {formatDate(blog.createdAt || new Date())}
                    </span>
                  </div>
                  <h2 className="blog-title">
                    <Link to={`/post/${blog._id}`}>{blog.title}</Link>
                  </h2>
                  <p className="blog-excerpt">
                    {blog.content.length > 150 
                      ? `${blog.content.substring(0, 150)}...` 
                      : blog.content}
                  </p>
                  <div className="blog-footer">
                    <div className="blog-stats">
                      <span className="blog-comments">
                        <FiMessageSquare className="icon" /> 36 comments
                      </span>
                      <span className="blog-author">
                        <FiUser className="icon" /> by {blog.author || 'Admin'}
                      </span>
                    </div>
                    <Link to={`/post/${blog._id}`} className="blog-read-more">
                      Read more <FiArrowRight className="icon" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;