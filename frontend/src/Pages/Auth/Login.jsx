import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import pethouse from "../../imag/petpalslogo (2).png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); // Update localStorage
        navigate(location.state || "/template");
      } else {
        // Handle specific error messages
        if (res.data.message === "Invalid email or password") {
          toast.error("Please provide both email and password.");
        } else if (res.data.message === "Email is not registerd") {
          toast.error("Email is not registered. Please sign up.");
        } else if (res.data.message === "Invalid Password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
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
          <div className="col-md-5">
            <h1>Welcome</h1>
            <p>Login to your Account</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="mb-3" data-aos="slide-up" data-aos-offset="100">
                <NavLink to="/forgot-password" className="btn">
                  Forgot Password?
                </NavLink>
              </div>
              <div className="d-flex">
                <button
                  type="submit"
                  className="btn-more px-5 py-3 btn-login mx-1"
                  data-aos="slide-up"
                  data-aos-offset="100"
                >
                  Login
                </button>
                <NavLink
                  to="/register"
                  className="btn-outline-more px-5 py-3 btn-login mx-1"
                  data-aos="slide-up"
                  data-aos-offset="100"
                >
                  Register
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
