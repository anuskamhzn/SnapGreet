import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    
    return (
        <div className='text-center' style={{ paddingTop: '20px' }}> {/* Added inline style for padding top */}
            <div className="list-group">
                <NavLink to="/dashboard/admin" style={{ color:'black' }}>
                    <h4>Admin Panel</h4>
                </NavLink>
                
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users </NavLink>
                <NavLink to="/dashboard/admin/request" className="list-group-item list-group-item-action">Requests</NavLink>
                {/* <NavLink to="/dashboard/admin/approved" className="list-group-item list-group-item-action">Approved Users</NavLink> */}
            </div>
            <div>
            </div>
        </div>
    );
};

export default AdminMenu;
