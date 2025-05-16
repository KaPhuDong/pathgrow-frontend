import react from "react";
import { Outlet, NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container">
            <div className="admin-management">
                    <div className="row min-vh-100">
                        {/* Sidebar */}
                        <div className="dashboard-left py-4">
                            <h4 className="admin-title">Admin</h4>
                            <ul className="nav">
                                <NavLink to="/admin" className="nav-item">
                                    <i class="fa-solid fa-user"></i>
                                    <span className="text-dark">User</span>
                                </NavLink>
                                <NavLink to="/admin" className="nav-item">
                                    <i class="fa-solid fa-landmark"></i>
                                    <span className="text-dark">Class</span>
                                </NavLink>
                                <NavLink to="/admin" className="nav-item">
                                    <i class="fa-solid fa-book"></i>
                                    <span className="text-dark">Activity Log</span>
                                </NavLink>
                            </ul>
                        </div>
                        {/* Main content */}
                        <div className="main-content">
                            <Outlet />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Dashboard;