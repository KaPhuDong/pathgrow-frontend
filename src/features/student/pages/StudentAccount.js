import React, { useState, useEffect } from "react";
import { Pencil, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const StudentAccount = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 Thêm state hiện/ẩn mật khẩu
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    password: "", // 👈 Thêm field password
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("/api/student/account");
        const data = response.data;
        setFormData({
          name: data.name,
          email: data.email,
          class: data.class || "",
          password: data.password || "", // 👈 Lấy luôn password từ API
        });
        setAvatar(data.avatar || "https://via.placeholder.com/150");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const openModal = () => setShowPasswordModal(true);
  const closeModal = () => setShowPasswordModal(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/student/account/update", formData);
      alert("Profile updated!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed!");
    }
  };

  return (
    <div className="container py-5">
      <div className="row bg-light rounded p-4">
        <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <input
            type="file"
            accept="image/*"
            id="avatarInput"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
          <button
            className="btn btn-info fw-bold text-white px-5 py-2 fs-5"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            Update
          </button>
        </div>

        <div className="col-md-8">
          <h4 className="fw-bold mb-4">Personal Information</h4>

          <div className="mb-3">
            <label className="form-label fw-medium">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Class</label>
            <input
              type="text"
              className="form-control"
              name="class"
              value={formData.class}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"} // 👈 chuyển đổi hiển thị
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={openModal}
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>

          <button className="btn btn-primary fw-bold" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-info text-white fw-bold">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAccount;
