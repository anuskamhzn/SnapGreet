import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserMenu from '../../components/Menu/UserMenu';

const UserRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useAuth();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`/api/v1/wish/requests?status=pending&postedBy=${auth.user._id}`);
                setRequests(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (auth.user) {
            fetchRequests();
        }
    }, [auth.user]);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 pt-4">
                        <h2>Pending Requests</h2>
                        {requests.length === 0 ? (
                            <p>No pending requests found.</p>
                        ) : (
                            <div className="cards">
                                {requests.map(request => (
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h3 className="card-title">{request.name}</h3>
                                            <p className="card-text">{request.description1}</p>
                                            <p className="card-text">{request.description2}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserRequest;
