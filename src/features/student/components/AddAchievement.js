import React, { useState } from 'react';
import Loading from '../../../components/ui/Loading';

const AddAchievement = ({ onClose, onAddAchievement, updateAchievement }) => {
  const [formData, setFormData] = useState(
    updateAchievement || {
      image: '',
      title: '',
      description: '',
    }
  );
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Chọn ảnh:', file);
    setImageFile(file);
  };

  const uploadImageToBackend = async () => {
    const token = localStorage.getItem('token');
    const data = new FormData();

    if (imageFile) {
      data.append('image', imageFile);
    }
    data.append('title', formData.title);
    data.append('description', formData.description);

    const url = updateAchievement
      ? `http://localhost:8000/api/achievements/${updateAchievement.id}`
      : 'http://localhost:8000/api/achievements';
    const method = updateAchievement ? 'POST' : 'POST';

    if (updateAchievement) {
      data.append('_method', 'PUT');
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error('Failed to upload: ' + errorText);
    }

    const result = await res.json();
    return result.achievement;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const achievement = await uploadImageToBackend();
      console.log(
        `${updateAchievement ? 'Cập nhật' : 'Thêm'} thành công`,
        achievement
      );

      onAddAchievement(achievement);

      if (!updateAchievement) {
        setFormData({ image: '', title: '', description: '' });
        setImageFile(null);
      }
      onClose();
    } catch (error) {
      console.error(
        `${
          updateAchievement ? 'Lỗi khi cập nhật' : 'Lỗi khi tải lên'
        } thành tựu`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-achievement-modal">
      <div
        className="modal-content"
        style={{ width: '500px', position: 'relative' }}
      >
        <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
          &times;
        </span>
        <h2 className="modal-title">
          {updateAchievement ? 'Update Achievement' : 'Add New Achievement'}
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required={!updateAchievement}
            disabled={loading}
          />

          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter your title …"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label htmlFor="description">Description</label>
          <textarea
            className="textarea-description"
            name="description"
            placeholder="Enter your description …"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <div className="btn-add__cancel">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-add" disabled={loading}>
              {updateAchievement ? 'Save' : 'Add'}
            </button>
          </div>
        </form>

        {/* Loading overlay */}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default AddAchievement;
