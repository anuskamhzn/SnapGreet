import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import pethouse from "../../imag/snapgreetlogo.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
      <div className="container register">
        <div className=" row mx-2 mt-5 justify-content-center align-item-center loginpage">
          <div className="col-md-5 px-4">
            {" "}
            <h1 className="purple" data-aos="slide-up" data-aos-offset="100">
              Register
            </h1>
          </div>
          <div className="col-md-5 p-4">
            <form onSubmit={handleSubmit}>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Enter your name</p>
                <span className="input-icons">
                  <CgProfile />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Eg: Snapgreeter"
                  required
                />
              </div>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Enter your email</p>
                <span className="input-icons">
                  <MdOutlineAlternateEmail />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="Eg: snapgreeter@gmail.com"
                  required
                />
              </div>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Enter password</p>
                <span className="input-icons">
                  <MdLockOpen />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="********"
                  required
                />
              </div>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Confirm password</p>{" "}
                <span className="input-icons">
                  <MdLockOpen />
                </span>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="input"
                  placeholder="********"
                  required
                />
              </div>
              <div
                className="mb-3 position-relative"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <p>Enter your number</p>
                <span className="input-icons">
                  <MdOutlinePhone />
                </span>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  placeholder="9841123456"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-more px-3 py-2"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                Submit
              </button>
              <p>
                <br></br>
                Already have an account?
                <NavLink
                  to="/login"
                  className="purple px-1 mb-4"
                  data-aos="slide-up"
                  data-aos-offset="50"
                >
                  Log in
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
