import react, { useState, useEffect } from 'react';
import Main from './Main';
import AddAchievement from '../components/AddAchievement';
import ToastNotification from '../../../components/ui/ToastNotification';

const StudentAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showAddAchievement, setAddAchievement] = useState(false);
  const [updateAchievement, setUpdateAchievement] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(
        'https://pathgrow-backend-z6tf.onrender.com/api/achievements',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAchievements(data.achievements);
    };

    fetchAchievements();
  }, []);
  const handleAddAchievement = (newAchievement) => {
    if (updateAchievement) {
      setAchievements((prev) =>
        prev.map((item) =>
          item.id === updateAchievement.id ? newAchievement : item
        )
      );
      setToastMessage('Achievement updated successfully!');
    } else {
      setAchievements((prev) => [...prev, newAchievement]);
      setToastMessage('Achievement added successfully!');
    }

    setShowToast(true);
    setUpdateAchievement(null);
    setAddAchievement(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    // console.log("Token:", token);
    const res = await fetch(
      `https://pathgrow-backend-z6tf.onrender.com/api/achievements/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setAchievements((prev) => prev.filter((item) => item.id !== id));
      setToastMessage('Achievement deleted successfully!');
      setShowToast(true);
    } else {
      console.error('Failed to delete achievement.');
    }
  };
  return (
    <Main>
      <div className="student-achievements container">
        <div className="btn-active d-flex g-2">
          <button
            className="btn-add-achievement"
            onClick={() => {
              setAddAchievement(true);
              setUpdateAchievement(null);
            }}
          >
            <i className="fa-solid fa-plus"></i> Add Achievement
          </button>
        </div>

        {showAddAchievement && (
          <AddAchievement
            onClose={() => {
              setAddAchievement(false);
              setUpdateAchievement(null);
            }}
            onAddAchievement={handleAddAchievement}
            updateAchievement={updateAchievement}
          />
        )}

        <div className="achievement-wrapper">
          {achievements.map((ach) => (
            <div className="achievement-card" key={ach.id}>
              <div className="achievement-image">
                <img src={ach.image_url} alt="achievement" />
              </div>
              <div className="achievement-info">
                <h4 className="achievement-title">
                  <strong>{ach.title}</strong>
                </h4>
                <p className="achievement-description">{ach.description}</p>
                <div className="achievement-actions">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setUpdateAchievement(ach);
                      setAddAchievement(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(ach.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default StudentAchievements;
