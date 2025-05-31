import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const ChangePassword = ({
  showPasswordModal,
  closeModal,
  setToastMessage,
  setShowToast,
}) => {
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    const errors = {};
    if (!passwordData.current_password) {
      errors.current_password = 'Please enter your current password.';
    }
    if (passwordData.new_password.length < 6) {
      errors.new_password = 'New password must be at least 6 characters.';
    }
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      errors.new_password_confirmation =
        'Password confirmation does not match.';
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/student/account/change-password',
        passwordData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToastMessage('Password changed successfully!');
      setShowToast(true);
      closeModal();
    } catch (error) {
      const serverError = error.response?.data?.error;
      if (serverError && serverError.includes('current password')) {
        setPasswordErrors((prev) => ({
          ...prev,
          current_password: 'Current password is incorrect.',
        }));
      } else {
        setToastMessage(
          'Failed to change password: ' +
            (error.response?.data?.error || error.message)
        );
        setShowToast(true);
      }
      console.error(error);
    }
  };

  const handleClose = () => {
    setPasswordData({
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    });
    setPasswordErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    closeModal();
  };

  if (!showPasswordModal) return null;

  return (
    <div className='change-password'>
      <div
        className="modal fade show"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ marginTop: '100px'}}>
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* Current Password */}
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <div className="input-group">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
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
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {passwordErrors.current_password && (
                  <small className="text-danger">
                    {passwordErrors.current_password}
                  </small>
                )}
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
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
                  <small className="text-danger">
                    {passwordErrors.new_password}
                  </small>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
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
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {passwordErrors.new_password_confirmation && (
                  <small className="text-danger">
                    {passwordErrors.new_password_confirmation}
                  </small>
                )}
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ backgroundColor: 'var(--secondary)', border: 'none', fontWeight: 'bold' }}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-info text-white fw-bold"
                style={{fontWeight: 'bold'}}
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChangePassword;
