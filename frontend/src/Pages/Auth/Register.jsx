import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import pethouse from "../../imag/pethouse.png";
// import "./css/register.css";  // Import the CSS file
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Register = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const role = queryParams.get("role");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        username,
        email,
        password,
        phone,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="register row">
        <div className="col-md-5">
          {" "}
          <img
            src={pethouse}
            className="img-fluid"
            data-aos="fade"
            data-aos-offset="100"
          ></img>
        </div>
        <div className="col-md-5 p-4">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder="Enter User Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Enter Phone no."
                required
              />
            </div>
            <button type="submit" className="btn-more">
              Submit
            </button>

            <button
              type="button"
              className="btn-more"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
