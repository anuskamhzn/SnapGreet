import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import styles from "./Header.css";
import logo from "../imag/snapgreetlogo.png";
import defaultProfilePhoto from "../imag/user/profile.jpg";

const Header = () => {
  const [show, setShow] = useState(false);
  const [activeNav, setActiveNav] = useState([true, false, false, false]);
  const [expand, setExpand] = useState(false);

  const closeNav = () => {
    setExpand(false);
  };

  const showDropdown = (e) => {
    setShow(!show);
  };

  const hideDropdown = (e) => {
    setShow(false);
  };

  const handleActiveNav = (i) => {
    let temp = activeNav;
    temp = temp.map((x) => (x = false));
    temp[i] = true;
    setActiveNav([...temp]);
    sessionStorage.setItem("NavbarMain", JSON.stringify(temp));
  };

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
        <div className="container-fluid container px-4 py-2">
          <Link to="/" className="navbar-brand">
            <div className="logoimg">
              <img src={logo} className="img-fluid" alt="Logo" />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/"
                className={`${styles.nav_text} nav-link ${
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                Home
              </NavLink>
            </p>
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/about"
                className={`${styles.nav_text} nav-link ${
                  activeNav[1] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(1);
                  closeNav();
                }}
                aria-current="page"
              >
                About us
              </NavLink>
            </p>
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/helpadvice"
                className={`${styles.nav_text} nav-link ${
                  activeNav[2] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(2);
                  closeNav();
                }}
                aria-current="page"
              >
                Help and Advice
              </NavLink>
            </p>
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/template"
                className={`${styles.nav_text} nav-link ${
                  activeNav[3] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(3);
                  closeNav();
                }}
                aria-current="page"
              >
                Find a Template
              </NavLink>
            </p>
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/contact"
                className={`${styles.nav_text} nav-link ${
                  activeNav[4] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(4);
                  closeNav();
                }}
                aria-current="page"
              >
                Contact us
              </NavLink>
            </p>
            <ul className="navbar-nav">
              <div className="d-flex right-nav">
                {auth.user ? (
                  <li className="dark-font nav-item dropdown loginbtn pt-1">
                    <NavLink
                      className="dark-font text-dark dropdown-toggle px-3"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="user-photo">
                        <img
                          src={userPhotoUrl}
                          alt="User Photo"
                          className="img-fluid"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultProfilePhoto;
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </NavLink>
                    <ul className="dropdown-menu loginbtn">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item "
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item mx-2 loginbtn ">
                    <Link to="/login" className=" dark-font nav-link px-2">
                      Login
                    </Link>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
