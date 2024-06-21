import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/admin.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminMenu from '../../components/Menu/AdminMenu';

const Request = () => {
    const [pendingWishes, setPendingWishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingWishes();
    }, []);

    const fetchPendingWishes = async () => {
        try {
            const response = await axios.get('/api/v1/admin/pending-wishes');
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

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

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
                            {pendingWishes.length === 0 ? (
                                <div>No pending wishes</div>
                            ) : (
                                <div className="cards">
                                    {pendingWishes.map((wish) => (
                                        <div className="card" key={wish._id}>
                                            <div className="content">
                                                <div className="header">{wish.name}</div>
                                                <div className="meta">{wish.nickname}</div>
                                                <div className="description">
                                                    <p>{wish.description1}</p>
                                                    <p>{wish.description2}</p>
                                                </div>
                                            </div>
                                            <div className="extra-content">
                                                <button
                                                    className="button"
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
