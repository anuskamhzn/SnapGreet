import React, { useState } from "react";
import UserMenu from "../../components/Menu/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Password = () => {
    const navigate = useNavigate();
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirmPass) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const formData = { password, confirmPassword: confirmPass };

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, formData);

            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Password Updated Successfully");
                navigate("/dashboard/user/userdb");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Header />
            <div className="container m-3 p-3 mt-5 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 pt-4">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">Update Password</h4>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="New Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Confirm Password"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Password;
