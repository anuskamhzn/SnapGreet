import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import pethouse from "../../imag/snapgreetlogo.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";

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
      <div className="container register">
        <div className=" row mx-2  mb-4 mt-4 justify-content-center align-item-center loginpage">
          <div className="col-md-5 text-center">
            <img
              src={pethouse}
              className="img-fluid"
              data-aos="fade"
              data-aos-offset="100"
              alt="Pet House"
            />
          </div>{" "}
          <div className="col-md-5">
            <form onSubmit={handleSubmit}>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Email</p>{" "}
                <span className="input-icons">
                  <MdOutlineAlternateEmail />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input "
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div
                className=" position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Password</p>
                <span className="input-icons">
                  <MdLockOpen />
                </span>
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
              <div className="" data-aos="slide-up" data-aos-offset="100">
                <NavLink to="/forgot-password" className="btn">
                  Forgot Password?
                </NavLink>
              </div>
              <button
                type="submit"
                className="btn-more px-5 py-3 btn-login mx-1 mb-2"
                data-aos="slide-up"
                data-aos-offset="50"
              >
                Login
              </button>
              <p>
                <br></br>
                Don't have an account?
                <NavLink
                  to="/register"
                  className="snapcolor px-1 mb-4"
                  data-aos="slide-up"
                  data-aos-offset="50"
                >
                  Register
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
