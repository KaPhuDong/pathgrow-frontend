import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import Main from './Main';
import ToastNotification from '../../../components/ui/ToastNotification';
import ChangePassword from '../components/ChangePassword';
const DEFAULT_AVATAR =
  'https://uuc.edu.vn/uploads/2025/04/16/67fecff2bdd55.webp';

const StudentAccount = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://127.0.0.1:8000/api/student/account',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data;
      setFormData({
        name: data.name,
        email: data.email,
        class: data.class || '',
      });
      setAvatarPreview(data.avatar || DEFAULT_AVATAR);
    } catch (error) {
      setToastMessage('Failed to load user information.');
      setShowToast(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const openModal = () => setShowPasswordModal(true);
  const closeModal = () => setShowPasswordModal(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log('Selecting image:', file);
    if (file) {
      if (!file.type.startsWith('image/')) {
        setToastMessage('Please select an image file.');
        setShowToast(true);
        return;
      }
      console.log('Image selected successfully:', file.name);
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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('name', formData.name);
      if (avatarFile) {
        console.log('Sending image:', avatarFile.name);
        form.append('avatar', avatarFile);
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/student/account/update',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API response:', response.data);
      setToastMessage('Information updated successfully!');
      setShowToast(true);
      setAvatarPreview(response.data.user.avatar || DEFAULT_AVATAR);
      setAvatarFile(null);
      await fetchProfile();
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      setToastMessage(
        'Failed to update information: ' +
          (error.response?.data?.error || error.message)
      );
      setShowToast(true);
    }
  };

  return (
    <Main>
      <div className="container py-5">
        <div className="row bg-light rounded p-4">
          <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
            <img
              src={avatarPreview || DEFAULT_AVATAR}
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <button
              className="btn btn-info fw-bold text-white px-5 py-2 fs-5"
              onClick={() => document.getElementById('avatarInput').click()}
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
              <button
                className="btn btn-info fw-bold text-white"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <ChangePassword
          showPasswordModal={showPasswordModal}
          closeModal={closeModal}
          setToastMessage={setToastMessage}
          setShowToast={setShowToast}
        />
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
