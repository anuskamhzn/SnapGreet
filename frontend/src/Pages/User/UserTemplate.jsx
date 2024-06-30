import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserMenu from '../../components/Menu/UserMenu';
import './css/UserTemp.css'; // Import CSS file for custom styles

const UserTemp = () => {
    const [error, setError] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear previous error

            try {
                const response = await axios.get(`/api/v1/auth/usertemp/${auth.user._id}`);
                setTemplates(response.data || []);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setTemplates([]); // No templates found
                } else {
                    setError(error.message); // Other errors
                }
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (auth.user) {
            fetchTemplates();
        } else {
            setLoading(false); // If no user, stop loading
        }
    }, [auth.user]);

    if (!auth.user) {
        return <p>User is not logged in.</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const getImageSrc = (templateType) => {
        return `/template-previews/${templateType}.jpg`;
    };

    const getFallbackImageSrc = (templateType) => {
        return `/template-previews/${templateType}.png`;
    };

    const handleUseTemplate = (templateType) => {
        navigate(`/templateform/${templateType}`);
    };

    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 pt-4">
                        <h1>All Used Templates</h1>
                        <div className="card-container">
                            {loading && <p className="loading">Loading...</p>}
                            {!loading && templates.length === 0 && <p>No templates found.</p>}
                            {!loading && templates.length > 0 && (
                                templates.map((template, index) => (
                                    <div key={index} className="card">
                                        {template.status !== 'rejected' ? (
                                            <a
                                                href={`https://resilient-moonbeam-0152f2.netlify.app/${template.templateType}/${template._id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={getImageSrc(template.templateType)}
                                                    alt={`${template.templateType} preview`}
                                                    className="card-img-top template-image"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                                        e.target.src = getFallbackImageSrc(template.templateType);
                                                    }}
                                                />
                                            </a>
                                        ) : (
                                            <img
                                                src={getImageSrc(template.templateType)}
                                                alt={`${template.templateType} preview`}
                                                className="card-img-top template-image"
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                                    e.target.src = getFallbackImageSrc(template.templateType);
                                                }}
                                            />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{template.templateType}</h5>
                                            <p className="card-text">{template.name}</p>
                                            {template.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleUseTemplate(template.templateType)}
                                                    className="btn btn-primary"
                                                >
                                                    Use Template
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserTemp;
