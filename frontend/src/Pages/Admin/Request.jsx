import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './css/admin.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminMenu from '../../components/Menu/AdminMenu';
import { Link } from 'react-router-dom';

const Request = () => {
    const [pendingWishes, setPendingWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        fetchPendingWishes();
    }, []);

    const fetchPendingWishes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/pending-wishes`);
            setPendingWishes(response.data.pendingWishes);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pending wishes:", error);
            setLoading(false);
        }
    };

    const approveWish = async (id) => {
        try {
            await axios.patch(`/api/v1/admin/approve/${id}`);
            fetchPendingWishes();
        } catch (error) {
            console.error("Error approving wish:", error);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const renderImage = (photo) => {
        if (!photo || !photo.data) return null;
        const base64String = arrayBufferToBase64(photo.data.data);
        return `data:${photo.contentType};base64,${base64String}`;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`/api/v1/auth/user-info/${userId}`);
                setUserInfo(response.data.user);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchUserInfo();
    }, [userId]);

    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 pt-4">
                        <div className="admin-container">
                            <h2>Pending Birthday Wishes</h2>
                            {loading ? (
                                <div>Loading...</div>
                            ) : pendingWishes.length === 0 ? (
                                <div className="notification">No pending wishes</div>
                            ) : (
                                <div className="list-group">
                                    {pendingWishes.map((wish) => (
                                        <div className="list-group-item notification" key={wish._id}>
                                            <div className="content">
                                                <Link to={`/request-info/${wish.postedBy._id}`} className="link">
                                                    {wish.postedBy.photo && (
                                                        <img
                                                            src={renderImage(wish.postedBy.photo)}
                                                            alt="User Photo"
                                                            className="user-photo"
                                                        />
                                                    )}
                                                </Link>
                                                <div className="user-details">
                                                    <div className="header">
                                                        {wish.postedBy.name} : {wish.postedBy.phone}

                                                    </div>
                                                    <div className="meta">{wish.templateType} : {wish.name}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="approve-button"
                                                    onClick={() => approveWish(wish._id)}
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Request;
