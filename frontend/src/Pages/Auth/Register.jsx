import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import pethouse from "../../imag/snapgreet.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Register = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const role = queryParams.get("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPass are the same
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          confirmPass,
          phone,
        }
      );
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
          <img
            src={pethouse}
            className="img-fluid"
            data-aos="fade"
            data-aos-offset="100"
            alt="Pet House"
          />
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
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="form-control"
                placeholder="Confirm Password"
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
            <button type="submit" className="btn-more px-3 py-2">
              Submit
            </button>

            <button
              type="button"
              className="btn-outline-more px-3 py-2 mx-2"
              onClick={() => navigate("/login")}
            >
              Already signed up?
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
