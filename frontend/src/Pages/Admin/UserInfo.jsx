import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Userinfo = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-info/${userId}`);
        setUserInfo(response.data.user);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) return;
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/delete-user/${userId}`);
      toast.success("User Deleted Successfully");
      navigate("/dashboard/admin/users");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="text-center" style={{ paddingTop: "50px" }}>User Info</h1>
        {error && <div>Error: {error}</div>}
        {userInfo && (
          <div className="container">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/auth/user-photo/${userInfo._id}`}
                    className="card-img-top"
                    alt={userInfo.name}
                    style={{ height: "200px", width: "200px" }}
                  />
                  <h4 className="card-title">Name: {userInfo.name}</h4>
                  <p className="card-text">Email: {userInfo.email}</p>
                  <p className="card-text">Phone: {userInfo.phone}</p>
                </div>
                {/* Uncomment the Edit button if you have the edit functionality implemented */}
                {/* <button onClick={() => navigate(`/dashboard/admin/edituser/${userId}`)} className="btn btn-primary mb-2">Edit</button> */}
                <button onClick={handleDelete} className="btn btn-danger mb-2">Delete</button>
                <button className="btn btn-info mb-2" style={{ color: "white" }} onClick={() => navigate("/dashboard/admin/users")}>Go Back</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Userinfo;
