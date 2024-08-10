import "../styles/event.css";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";

const Event = () => {
    const [event, setEvent] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/event")
            .then(({ data }) => setEvent(data))
            .catch((err) => console.log(err));
    }, []);
    const formatDate = (dateString) => {
        const createdAtDate = new Date(dateString);
        return `${createdAtDate.toLocaleDateString('en-US')}`;
    };
    return (
        <div><Navbar />
            <div className="container">
            {/* Blog Area */}
            <section className="blog_area section-padding">
                    <div className="row">
                        <div>
                            <div className="blog_left_sidebar">
                                {/* Article 1 */}
                                {event && event.map((eventItem) => {
                                    return (
                                        <article className="blog_item" key={eventItem._id}>
                                            <div className="blog_item_img">
                                                <h1 className="name">{eventItem.title}</h1>
                                                <img className="image" src={`/images_db/${eventItem.picture[0]}`} alt="" />
                                                <a className="blog_item_date">
                                                    <h3>{formatDate(eventItem.datetime)}</h3>
                                                </a>
                                            </div>
                                            <div className="blog_details">
                                                <p>
                                                {eventItem.content}
                                                </p>
                                                <ul className="blog-info-link">
                                                    <li><a href="#">Like</a></li>
                                                    <li><a href="#">Comments</a></li>
                                                </ul>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            </section>
        </div>
        </div>
    );
}

export default Event;
