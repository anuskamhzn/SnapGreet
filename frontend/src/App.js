import React from "react";
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

const App = () => {
  const [auth] = useAuth();

  const handleNewTemplate = (template) => { };
  AOS.init({
    // Global settings:
    // disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 100, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 100, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 70, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 900, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={!(auth?.user) ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={auth?.user ? <Homepage /> : <Navigate to="/login" />}
        />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/template" element={<FindTemplate />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/user-info/:userId" element={<Userinfo />} />
        <Route path="/request-info/:userId" element={<Requestinfo />} />
        <Route
          path="/templatedetail/:templateType"
          element={<TemplateDetail />}
        />
        <Route
          path="/templateform/:templateType"
          element={<TemplateForm onNewTemplate={handleNewTemplate} />}
        />
        <Route path="/:type/:id" element={<TemplateView />} />

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/request" element={<Request />} />
        </Route>

        <Route path="/dashboard" element={<UserRoutes />}>
          <Route path="user/userdb" element={<UserDashboard />} />
          <Route path="user/updateprofile" element={<UpdateProfile />} />
          <Route path="user/request" element={<UserRequest />} />
          <Route path="user/notification" element={<Notification />} />
          <Route path="user/user-temp" element={<UserTemp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
