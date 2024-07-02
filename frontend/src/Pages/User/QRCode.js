// src/components/QRCode.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import img from '../../imag/qr.png';
import './css/QRCode.css'; // Assuming you will add some custom styles here

const QRCode = () => {
    const { userId, id } = useParams();
    const [randomChars, setRandomChars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRandomChars = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/wish/random/${userId}/${id}`);
                setRandomChars(response.data.randomChars);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomChars();
    }, [userId, id]);

    const handleCopy = () => {
        if (randomChars) {
            navigator.clipboard.writeText(randomChars)
                .then(() => {
                    toast.success('Copied!');
                })
                .catch(err => {
                    toast.error('Failed to copy!');
                });
        }
    };

    const handleHome = () => {
    // Confirm creation with user
    const confirmed = window.confirm("Did you copied the code?");
    if (!confirmed) {
      return;
    }
        // Set session storage and navigate to the homepage with state
        sessionStorage.setItem("showPopup", "true");
        navigate("/", { state: { showPopup: true } });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header />
            <div className="container-fluid m-3 p-3 pt-4 d-flex justify-content-center">
                <div className="card shadow p-4 text-center">
                    <div className="card-body">
                        <h1 className="card-title">Scan QR Code</h1>
                        <h6 className="card-subtitle mb-2 text-danger">Note:</h6>
                        <p className="card-text text-danger">Make sure to copy the below code and paste it in the remarks during the payment process.</p>
                        <p className="card-text random-chars">Your Code is: {randomChars}</p>
                        <button className="btn btn-primary mb-3" onClick={handleCopy}>Copy</button>
                        <div className="d-flex justify-content-center">
                            <img src={img} alt="QR Code" className="img-fluid" />
                        </div>
                        <button className='btn btn-success mb-3' onClick={handleHome}>Done</button>
                    </div>
                </div>
                <Toaster />
            </div>
            <Footer />
        </div>
    );
};

export default QRCode;
