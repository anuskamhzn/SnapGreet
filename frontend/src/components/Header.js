import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
import styles from "./Header.css";
import logo from "../imag/snapgreetlogo.png";

import { FaLongArrowAltRight } from "react-icons/fa";

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

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid container">
          <Link to="/" className="navbar-brand">
            <div className="logoimg">
              <img src={logo} className="img-fluid" alt="My Image" />
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
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                About us
              </NavLink>
            </p>{" "}
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/helpadvice"
                className={`${styles.nav_text} nav-link ${
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                Help and Advice
              </NavLink>
            </p>{" "}
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/template"
                className={`${styles.nav_text} nav-link ${
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                Find a Templates
              </NavLink>
            </p>{" "}
            <p className="nav-item p-2 pt-3 px-4">
              <NavLink
                to="/contact"
                className={`${styles.nav_text} nav-link ${
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                Contact us
              </NavLink>
            </p>
            <ul className="navbar-nav">
              <div className="d-flex right-nav">
                {/* <SearchInput /> */}

                {auth.user ? (
                  <li className="dark-font nav-item dropdown loginbtn pt-1">
                    <NavLink
                      className="dark-font text-dark dropdown-toggle px-3"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="username ">
                        {auth?.user?.username.length > 5
                          ? auth?.user?.username.slice(0, 5) + ".."
                          : auth?.user?.username}
                      </span>
                    </NavLink>
                    <ul className="dropdown-menu loginbtn">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1
                              ? "admin"
                              : auth?.user?.role === 2
                              ? "shelter"
                              : "user"
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
