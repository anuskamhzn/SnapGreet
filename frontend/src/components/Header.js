import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import styles from "./Header.css";
import logo from "../imag/snapgreetlogo.png";
import defaultProfilePhoto from "../imag/user/profile.jpg";
import add from "../imag/icons/add.png";
import notification from "../imag/icons/notification.png";
import { AiFillHome } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Success");
  };

  const userPhotoUrl = auth?.user
    ? `${process.env.REACT_APP_API}/api/v1/auth/user-photo/${auth.user._id}`
    : defaultProfilePhoto;

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container nav-container px-4 py-2">
          <Link to="/" className="navbar-brand">
            <div className="d-flex">
              <div className="logoimg">
                <img src={logo} className="img-fluid" alt="Logo" />
              </div>
              <span className="logoname">SnapGreet</span>
            </div>
          </Link>

          <div className="justify-content-end d-flex align-items-center rightnav">
            <div className="nav-item rightnavicon">
              <NavLink
                to="/"
                className="nav-link"
                activeClassName="nav-icon-active"
                aria-current="page"
              >
                <div className="nav-icon">
                  <AiFillHome />
                </div>
              </NavLink>
            </div>
            <div className="nav-item rightnavicon">
              <NavLink
                to="/dashboard/user/notification"
                className="nav-link"
                activeClassName="nav-icon-active"
                aria-current="page"
              >
                <div className="nav-icon-1">
                  <MdNotifications />
                </div>
              </NavLink>
            </div>
            <div className="nav-item mt-1">
              {auth.user ? (
                <NavLink
                  to={`/dashboard/${
                    auth?.user?.role === 1 ? "admin" : "user/userdb"
                  }`}
                  role="button"
                >
                  <span className="user-photo">
                    <img
                      src={userPhotoUrl}
                      alt="User Photo"
                      className="img-fluid profile-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProfilePhoto;
                      }}
                    />
                  </span>
                </NavLink>
              ) : (
                <li className="nav-item mx-2 loginbtn ">
                  <Link to="/login" className="dark-font nav-link px-2">
                    Login
                  </Link>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
