import { useEffect, useState } from "react";
import axios from "axios";
import { FiCalendar, FiHeart, FiMessageSquare, FiMapPin, FiClock } from "react-icons/fi";
import Navbar from '../components/Navbar';
import '../styles/event.css';

const Event = ({ loggedUser }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/event");
                setEvents(data);
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="event-container">
            <Navbar loggedUser={loggedUser} />
            
            <div className="event-hero">
                <div className="container">
                    <h1 className="event-hero-title">Upcoming Events</h1>
                    <p className="event-hero-subtitle">Discover and join our exciting events</p>
                </div>
            </div>

            <div className="container">
                {isLoading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading events...</p>
                    </div>
                ) : (
                    <div className="event-grid">
                        {events.map(event => (
                            <div className="event-card" key={event._id}>
                                <div className="event-card-image">
                                    <img 
                                        src={`/images_db/${event.picture[0]}`} 
                                        alt={event.title}
                                        loading="lazy"
                                    />
                                    <div className="event-date-badge">
                                        <FiCalendar className="icon" />
                                        <span>{formatDate(event.datetime).split(',')[0]}</span>
                                    </div>
                                </div>
                                <div className="event-card-content">
                                    <h2 className="event-title">{event.title}</h2>
                                    
                                    <div className="event-meta">
                                        <span className="event-location">
                                            <FiMapPin className="icon" />
                                            {event.location || 'Online Event'}
                                        </span>
                                        <span className="event-time">
                                            <FiClock className="icon" />
                                            {formatDate(event.datetime).split(',')[1]}
                                        </span>
                                    </div>
                                    
                                    <p className="event-description">
                                        {event.content.length > 200 
                                            ? `${event.content.substring(0, 200)}...` 
                                            : event.content}
                                    </p>
                                    
                                    <div className="event-actions">
                                        <button className="event-like-btn">
                                            <FiHeart className="icon" />
                                            <span>Like</span>
                                        </button>
                                        <button className="event-comment-btn">
                                            <FiMessageSquare className="icon" />
                                            <span>Comments</span>
                                        </button>
                                        <button className="event-rsvp-btn">
                                            RSVP Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Event;