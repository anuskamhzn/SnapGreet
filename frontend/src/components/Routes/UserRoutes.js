import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function UserRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/user-auth');
                setOk(res.data.ok);
            } catch (error) {
                console.error("Error occurred while checking authentication:", error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return <Outlet />;
}
