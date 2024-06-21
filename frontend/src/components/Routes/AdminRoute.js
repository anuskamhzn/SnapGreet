import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/admin-auth', {
                    headers: { Authorization: `Bearer ${auth?.token}` }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error occurred while checking authentication:", error);
                setOk(false);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setLoading(false);
        }
    }, [auth?.token]);


    return <Outlet />;
}
