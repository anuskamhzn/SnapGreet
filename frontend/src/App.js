import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Homepage from './Pages/HomePage';
// import FormPage from './Pages/formpage/formpage';
import User from './Pages/Admin/Users';
import Request from './Pages/Admin/Request';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import About from './Pages/About';
import HelpAdvice from './Pages/HelpAdvide';
import Contact from './Pages/Contact';
import FindTemplate from './Pages/FindTemplate';
import Pagenotfound from './Pages/PageNotFound';
import './index.css';
import AdminRoutes from './components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserRoutes from './components/Routes/UserRoutes';
import UserDashboard from './Pages/User/UserDashboard';
import UpdateProfile from './Pages/User/UpdateProfile';
import UserRequest from './Pages/User/Request';
import Notification from './Pages/User/Notification';
import UserTemp from './Pages/User/UserTemplate';
import Userinfo from './Pages/Admin/UserInfo';
import TemplateDetail from './Pages/TempComponent/TemplateDetail';
import TemplateForm from './Pages/TempComponent/TemplateForm';
import TemplateView from './Pages/TempComponent/TemplateView';

const App = () => {
  const handleNewTemplate = (template) => {
  };
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpadvice" element={<HelpAdvice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/template" element={<FindTemplate />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/user-info/:userId" element={<Userinfo />} />
        <Route path="/templatedetail/:templateType" element={<TemplateDetail />} />
        <Route path="/templateform/:templateType" element={<TemplateForm onNewTemplate={handleNewTemplate} />} />
        <Route path="/:type/:id" element= {<TemplateView />}/>

        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/request" element={<Request />} />
        </Route>

        <Route path="/dashboard" element={<UserRoutes />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/updateprofile" element={<UpdateProfile />} />
          <Route path="user/request" element={<UserRequest />}/>
          <Route path="user/notification" element={<Notification />}/>
          <Route path="user/user-temp" element={<UserTemp />}/>
        </Route>
      </Routes>

    </>
  );
};

export default App;
