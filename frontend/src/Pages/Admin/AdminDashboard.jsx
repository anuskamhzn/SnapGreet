import React from 'react';
import AdminMenu from '../../components/Menu/AdminMenu';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
    <Header/>
      <div className='container-fluid m-3 p-3 pt-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-4">
            <h1>Profile</h1>
            <div className="row"></div>
            <div className="card w-75 p-3">
              <div className="row">
                <div className="col-md-6 d-flex flex-column  justify-content-center">
                  <h5 className="py-3">Name: {auth?.user?.name}</h5>
                  <h5 className="py-3">Email: {auth?.user?.email}</h5>
                  <h5 className="py-3">Phone: {auth?.user?.phone}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdminDashboard;
