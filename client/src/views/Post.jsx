import  { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/BlogPost.css';

import '../styles/event.css';
import { useParams } from 'react-router-dom';

const Post = () => {
    const [blogs, setBlogs] = useState(null);
    const [comment, setComment] = useState(null);
    const { id } = useParams();

    useEffect(()=>{
        axios.get('http://localhost:8000/api/item/'+id).then(res=>setBlogs(res.data)).catch(err=>console.log(err))
    },[id]);
      

    const addLike = async (id) => {
        try {
        const likes = blogs.find(obj => obj._id === id);
        const addLike = likes.likes + 1;
        await axios.put(`http://localhost:8000/api/blog/${id}`, { likes: addLike });
        const response = await axios.get('http://localhost:8000/api/blog');
        setBlogs(response.data);
        } catch (error) {
        console.error('Error updating likes:', error);
        }
    };

    const commentaire = async (id) => {
        try {
        const comments = blogs.find(obj => obj._id === id);
        const addComments = comments.comments;
        await axios.put(`http://localhost:8000/api/blog/${id}`, { comments: [...addComments, comment] });
        const response = await axios.get('http://localhost:8000/api/blog');
        setBlogs(response.data);
        } catch (error) {
        console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="container">
        <main className="tm-main">
            {blogs && blogs.map(blog => (
            <div key={blog._id} className="row tm-row">
                <div className="col-12">
                <hr className="tm-hr-primary tm-mb-55" />
                <img src={`/images_db/${blog.picture[0]}`} alt="" />
                </div>
                <div className="row tm-row">
                <div className="col-lg-8 tm-post-col">
                    <div className="tm-post-full">
                    <div className="mb-4">
                        <h2 className="pt-2 tm-color-primary tm-post-title">{blog.title}</h2>
                        <p className="tm-mb-40">June 16, 2020 posted by Admin Nat</p>
                        <p>{blog.content}</p>
                    </div>
                    <div>
                        <h2 className="tm-color-primary tm-post-title">Comments</h2>
                        <hr className="tm-hr-primary tm-mb-45" />
                        <div className="tm-comment tm-mb-45">
                        <div>
                            <p>Praesent aliquam ex vel lectus ornare tritique. Nunc et eros quis enim feugiat tincidunt et vitae dui. Nullam consectetur justo ac ex laoreet rhoncus. Nunc id leo pretium, faucibus sapien vel, euismod turpis.</p>
                            <div className="d-flex justify-content-between">
                            <span className="tm-color-primary">June 14, 2020</span>
                            </div>
                        </div>
                        </div>
                        <form action="" className="mb-5 tm-comment-form">
                        <button onClick={() => addLike(blog._id)}>Like</button>
                        <h2 className="tm-color-primary tm-post-title mb-4">Your comment</h2>
                        <div>
                            <textarea className="form-control" name="message" rows="6" onChange={e => setComment(e.target.value)}></textarea>
                        </div>
                        <div className="text-right">
                            <button className="tm-btn tm-btn-primary tm-btn-small" onClick={() => commentaire(blog._id)}>Submit</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </main>
        </div>
    );
    };

    export default Post;
