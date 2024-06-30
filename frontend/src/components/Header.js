import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import styles from "./Header.css";
import logo from "../imag/snapgreetlogo.png";
import defaultProfilePhoto from "../imag/user/profile.jpg";
import add from "../imag/icons/add.png";
import notification from "../imag/icons/notification.png";

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
        <div className=" container nav-container px-4 py-2">
          <Link to="/" className="navbar-brand">
            <div className="d-flex">
              <div className="logoimg">
                <img src={logo} className="img-fluid" alt="Logo" />
              </div>
              <span className="logoname">SnapGreet</span>
            </div>
          </Link>

          <div className=" justify-content-end d-flex align-items-center rightnav">
            <div className="nav-item  rightnavicon">
              <NavLink
                to="/template"
                onClick={() => {
                  handleActiveNav(3);
                  closeNav();
                }}
                aria-current="page"
              >
                <img src={add} className=" nav-icon-1 add" alt="Add"></img>
              </NavLink>
            </div>{" "}
            <div className="nav-item  rightnavicon">
              <NavLink
                to="/dashboard/user/notification"
                className={`${styles.nav_text} nav-link ${
                  activeNav[0] ? styles.active : ""
                }`}
                onClick={() => {
                  handleActiveNav(0);
                  closeNav();
                }}
                aria-current="page"
              >
                <img
                  src={notification}
                  className="img-fluid nav-icon"
                  alt="Notification"
                ></img>
              </NavLink>
            </div>
            <div className="nav-item  mt-1">
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
                  <Link to="/login" className=" dark-font nav-link px-2">
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
