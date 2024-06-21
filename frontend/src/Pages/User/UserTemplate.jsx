import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserMenu from '../../components/Menu/UserMenu';

const UserTemp = () => {
    const [error, setError] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [auth] = useAuth();

    useEffect(() => {
        if (!auth.user) {
            return;
        }

        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`/api/v1/auth/usertemp/${auth.user._id}`);
                setTemplates(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setTemplates([]);
                } else {
                    setError(error.message);
                }
            }
        };

        fetchTemplates();
    }, [auth.user]);

    if (!auth.user) {
        return <p>User is not logged in.</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

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
                        {templates.length === 0 ? (
                            <p>No templates found.</p>
                        ) : (
                            <ul>
                                {templates.map((template, index) => (
                                    <li key={index}>{template.templateType}</li>
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

export default UserTemp;
