import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Homepage from "./Pages/HomePage";
import User from "./Pages/Admin/Users";
import Request from "./Pages/Admin/Request";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Contact from "./Pages/Contact";
import FindTemplate from "./Pages/FindTemplate";
import Pagenotfound from "./Pages/PageNotFound";
import "./index.css";
import AdminRoutes from "./components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserRoutes from "./components/Routes/UserRoutes";
import UserDashboard from "./Pages/User/UserDashboard";
import UpdateProfile from "./Pages/User/UpdateProfile";
import UserRequest from "./Pages/User/Request";
import Notification from "./Pages/User/Notification";
import UserTemp from "./Pages/User/UserTemplate";
import Userinfo from "./Pages/Admin/UserInfo";
import Requestinfo from "./Pages/Admin/RequestUser";
import TemplateDetail from "./Pages/TempComponent/TemplateDetail";
import TemplateForm from "./Pages/TempComponent/TemplateForm";
import TemplateView from "./Pages/TempComponent/TemplateView";
import { useAuth } from "./context/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import Password from "./Pages/User/Password";

const App = () => {
  const [auth] = useAuth();

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 100,
      throttleDelay: 100,
      offset: 70,
      delay: 0,
      duration: 900,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={!auth?.user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={auth?.user ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/template" element={<FindTemplate />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/user-info/:userId" element={<Userinfo />} />
        <Route path="/request-info/:userId" element={<Requestinfo />} />
        <Route path="/templatedetail/:templateType" element={<TemplateDetail />} />
        <Route path="/templateform/:templateType" element={<TemplateForm />} />
        <Route path="/:type/:id" element={<TemplateView />} />

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/request" element={<Request />} />
        </Route>

        <Route path="/dashboard" element={<UserRoutes />}>
          <Route path="user/userdb" element={<UserDashboard />} />
          <Route path="user/updateprofile" element={<UpdateProfile />} />
          <Route path="user/updatepassword" element={<Password />} />
          <Route path="user/request" element={<UserRequest />} />
          <Route path="user/notification" element={<Notification />} />
          <Route path="user/user-temp" element={<UserTemp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
