import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserMenu from '../../components/Menu/UserMenu';
import './css/notifications.css';
import toast from 'react-hot-toast';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useAuth();

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching starts

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/notifications/${auth.user._id}`, {
                    headers: {
                        Authorization: auth.token // Send token directly
                    }
                });
                setNotifications(response.data.data || []); // Ensure notifications is always an array
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false); // Always set loading to false, whether successful or not
            }
        };

        if (auth.user) {
            fetchNotifications();
        } else {
            setLoading(false); // If no user, stop loading
        }
    }, [auth.user, auth.token]); // Depend on auth.user and auth.token

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            toast.success('Link copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 pt-4 admin-container">
                        <h1>Notifications</h1>
                        {loading && <p className="loading">Loading...</p>}
                        {error && <p className="error">{error}</p>}
                        {!loading && !error && notifications.length === 0 && <p className="no-notifications">No notifications found.</p>}
                        {!loading && !error && notifications.length > 0 && (
                            <ul className="list-group">
                                {notifications.map(notification => {
                                    const isRejected = notification.message.toLowerCase().includes('rejected');
                                    const link = `https://resilient-moonbeam-0152f2.netlify.app/${notification.templateType}/${notification.birthdayModelId}`;
                                    return (
                                        <li key={notification._id} className="notification">
                                            <div className="content">
                                                <div className="header">{notification.message}</div>
                                                {/* Additional details if needed */}
                                            </div>
                                            {!isRejected && (
                                                <div>
                                                    <a
                                                        href={link}
                                                        className="approve-button"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Link to Template
                                                    </a>
                                                    <button
                                                        onClick={() => handleCopy(link)}
                                                        className="copy-button"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Notification;
