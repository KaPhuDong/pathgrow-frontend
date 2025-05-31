import react, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Main2 from './Main2';
import ToastNotification from '../../../components/ui/ToastNotification';
import api from '../../../api/teacher/api';
import { TbBackground } from 'react-icons/tb';
import { GrTextAlignCenter } from 'react-icons/gr';

const StudentAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showAddAchievement, setAddAchievement] = useState(false);
  const [updateAchievement, setUpdateAchievement] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { studentId } = useParams();
  console.log('studentId from URL:', studentId);

  useEffect(() => {
    const fetchAchievements = async () => {
      const data = await api.getAchievements(studentId);
      setAchievements(data.achievements);
    };

    fetchAchievements();
  }, []);

  return (
    <Main2>
      <div className="student-achievements container">
        <div className="mt-5">
          <h2
            className="mb-4"
            style={{ textAlign: 'center', color: 'var(--primary)' }}
          >
            Achievements
          </h2>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showToast && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </Main2>
  );
};

export default StudentAchievements;
