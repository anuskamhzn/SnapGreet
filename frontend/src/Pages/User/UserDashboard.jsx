import React from "react";
import UserMenu from "../../components/Menu/UserMenu";
import { useAuth } from "../../context/auth";
import Header from "../../components/Header";
import toast from "react-hot-toast";

import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import defaultProfilePhoto from "../../imag/user/profile.jpg"; // Import the default profile photo

const UserDashboard = () => {
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
      <Header />
      <div className="container p-3 pt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-4">
            <div className="card p-3">
              <div className="row">
                <div className="col-md-5 d-flex align-items-center justify-content-center">
                  <img
                    src={userPhotoUrl}
                    className="img-fluid"
                    alt={auth?.user?.name || "Default Profile Photo"}
                    style={{ width: "200px" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfilePhoto;
                    }}
                  />
                </div>
                <div className="col-md-5 d-flex flex-column justify-content-center">
                  <h5 className="py-3">Name: {auth?.user?.name}</h5>
                  <h5 className="py-3">User Name: {auth?.user?.username}</h5>
                  <h5 className="py-3">Email: {auth?.user?.email}</h5>
                  <h5 className="py-3">Phone: {auth?.user?.phone}</h5>
                  <Link
                    to="/dashboard/user/updateprofile"
                    className=" py-3 btn-more"
                  >
                    Edit Account
                  </Link>{" "}
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className=" py-3 my-2 btn-more"
                  >
                    Log out{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
