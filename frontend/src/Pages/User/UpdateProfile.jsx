import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Menu/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const UpdateProfile = () => {
    const navigate = useNavigate();
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState(null); // New state for storing the selected photo

    useEffect(() => {
        const { email, name, username, phone } = auth?.user;
        setName(name);
        setUserName(username);
        setPhone(phone);
        setEmail(email);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // Create a FormData object to send file data
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("photo", photo); // Append the selected photo to the form data

            const { data } = await axios.put("/api/v1/auth/profile", formData);

            if (data?.errro) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
                navigate("/dashboard/user");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Function to handle file input change
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Set the selected photo to the state
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
                        <div className="form-container ">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">Update Profile</h4>
                                {/* Add file input for photo */}
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="form-control"
                                        id="photoInput"
                                    />
                                </div>
                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter User Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Email "
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Phone"
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

export default UpdateProfile;
