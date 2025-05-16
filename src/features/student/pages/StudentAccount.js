import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentAccount = () => {
  return (
    <div className="container mt-5">
      <div className="row bg-white shadow rounded overflow-hidden">
        {/* LEFT: Avatar + Update */}
        <div className="col-md-4 p-4 bg-light d-flex flex-column align-items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <button className="btn btn-info fw-bold text-white mb-4 px-4">Update</button>
          <div className="bg-secondary w-100 rounded" style={{ height: "200px" }}></div>
        </div>

        {/* RIGHT: Form */}
        <div className="col-md-8 p-4">
          <h4 className="fw-bold mb-4">Personal Information</h4>
          <form>
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Full Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="Enter full name" />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Class</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="Enter class" />
              </div>
            </div>

            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-7">
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-info text-white">Icon</button>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-light p-4 rounded mb-3 border">
              <h5 className="mb-4">Change Password</h5>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Current Password</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" placeholder="Current password" />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">New Password</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" placeholder="New password" />
                </div>
              </div>

              <div className="mb-4 row">
                <label className="col-sm-4 col-form-label">Confirm New Password</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-info fw-bold text-white px-4">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAccount;
