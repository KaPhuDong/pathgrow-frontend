import React, { useState, useEffect } from "react";
import { Pencil, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Main from './Main';
import ToastNotification from '../../../components/ui/ToastNotification';

const StudentAccount = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/student/account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setFormData({
        name: data.name,
        email: data.email,
        class: data.class || "",
      });
      setAvatarPreview(data.avatar);
    } catch (error) {
      setToastMessage("Failed to load user information.");
      setShowToast(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const openModal = () => setShowPasswordModal(true);
  const closeModal = () => {
    setShowPasswordModal(false);
    setPasswordErrors({});
    setPasswordData({
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setToastMessage("Please select an image file.");
        setShowToast(true);
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("name", formData.name);
      if (avatarFile) {
        console.log("Sending image:", avatarFile.name);
        form.append("avatar", avatarFile);
      }

      const response = await axios.post("http://127.0.0.1:8000/api/student/account/update", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API response:", response.data);
      setToastMessage("Information updated successfully!");
      setShowToast(true);
      setAvatarPreview(response.data.user.avatar);
      setAvatarFile(null);
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      setToastMessage("Failed to update information: " + (error.response?.data?.error || error.message));
      setShowToast(true);
    }
  };

  const handleChangePassword = async () => {
    const errors = {};
    if (!passwordData.current_password) {
      errors.current_password = "Please enter your current password.";
    }
    if (passwordData.new_password.length < 8) {
      errors.new_password = "New password must be at least 8 characters.";
    }
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      errors.new_password_confirmation = "Password confirmation does not match.";
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/student/account/change-password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToastMessage("Password changed successfully!");
      setShowToast(true);
      closeModal();
    } catch (error) {
      const serverError = error.response?.data?.error;
      if (serverError && serverError.includes("current password")) {
        setPasswordErrors((prev) => ({
          ...prev,
          current_password: "Current password is incorrect.",
        }));
      } else {
        setToastMessage("Failed to change password: " + (error.response?.data?.error || error.message));
        setShowToast(true);
      }
      console.error(error);
    }
  };

  return (
    <Main>
      <div className="container py-5">
        <div className="row bg-light rounded p-4">
          <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
            <img
              src={avatarPreview}
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
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Class</label>
              <input
                type="text"
                className="form-control"
                name="class"
                value={formData.class}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value="********"
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={openModal}
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-info fw-bold text-white" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
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
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {/* Current Password */}
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <div className="input-group">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="current_password"
                        className="form-control"
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                        minLength={6}
                        maxLength={32}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {passwordErrors.current_password && (
                      <small className="text-danger">{passwordErrors.current_password}</small>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="new_password"
                        className="form-control"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {passwordErrors.new_password && (
                      <small className="text-danger">{passwordErrors.new_password}</small>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="new_password_confirmation"
                        className="form-control"
                        value={passwordData.new_password_confirmation}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {passwordErrors.new_password_confirmation && (
                      <small className="text-danger">{passwordErrors.new_password_confirmation}</small>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary" style={{ backgroundColor: "var(--secondary)", border:"none" }}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-info text-white fw-bold"
                    onClick={handleChangePassword}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showToast && (
        <ToastNotification
            message={toastMessage}
            onClose={() => setShowToast(false)}
        />
      )}
    </Main>
  );
};

export default StudentAccount;
