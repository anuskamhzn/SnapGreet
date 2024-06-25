import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserMenu from '../../components/Menu/UserMenu';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useAuth();

    useEffect(() => {
        if (!auth.user) {
            return;
        }

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/v1/notifications/${auth.user._id}`);
                setNotifications(response.data.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications(); // Fetch data on component mount
    }, [auth.user]);

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
                                {notifications.map(notification => (
                                    <li key={notification._id} className="notification">
                                        <div className="content">
                                            <div className="header">{notification.message}</div>
                                            {/* <div className="meta">Notification details</div>
                                            <div className="description">Additional information about the notification.</div> */}
                                        </div>
                                        <a
                                            href={`http://localhost:3000/${notification.templateType}/${notification.birthdayModelId}`}
                                            className="approve-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Link to Template
                                        </a>
                                    </li>
                                ))}
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
