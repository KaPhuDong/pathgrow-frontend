import React, { useState, useEffect } from 'react';
import api from '../../../api/student/api';

const LearningTarget = ({ weekId }) => {
  const [goals, setGoals] = useState([]);

  // Hàm lấy danh sách mục tiêu từ backend
  const fetchGoals = async () => {
    try {
      const response = await api.getWeeklyGoals(weekId);
      const data = response.data;
      if (Array.isArray(data)) {
        const formattedGoals = data.map((item) => ({
          id: item.id,
          text: item.name || '',
          checked: item.completed === 1,
        }));
        setGoals(formattedGoals);
      } else {
        console.warn('Dữ liệu trả về không phải là mảng:', data);
        setGoals([]);
      }
    } catch (error) {
      console.error('Lỗi khi fetch goals:', error);
      setGoals([]);
    }
  };

  useEffect(() => {
    if (weekId) {
      fetchGoals();
    }
  }, [weekId]);

  // Thêm mục tiêu mới
  const handleAddGoal = async () => {
    try {
      const newGoal = {
        weekly_study_plan_id: weekId,
        name: `Goal No.${goals.length + 1}`,
        completed: 0,
      };
      const response = await api.createWeeklyGoal(newGoal);
      const createdGoal = response.data;
      setGoals((prev) => [
        ...prev,
        {
          id: createdGoal.id,
          text: createdGoal.name || '',
          checked: createdGoal.completed === 1,
        },
      ]);
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    }
  };

  // Xóa mục tiêu
  const handleDeleteGoal = async (id) => {
    try {
      await api.deleteWeeklyGoal(id);
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa mục tiêu:', error);
    }
  };

  // Cập nhật nội dung mục tiêu
  const handleInputChange = async (id, newText) => {
    try {
      await api.updateWeeklyGoal(id, { name: newText });
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? { ...goal, text: newText } : goal))
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật mục tiêu:', error);
    }
  };

  // Cập nhật trạng thái hoàn thành
  const handleCheck = async (id, checked) => {
    try {
      await api.updateWeeklyGoal(id, { completed: checked ? 1 : 0 });
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? { ...goal, checked } : goal))
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái mục tiêu:', error);
    }
  };

  return (
    <section className="learning-target">
      <h3>My learning target</h3>
      <p>
        At the end of this period learning, what exactly would I like to be able
        to do in the language?
        <br />
        <small>
          (Use the assessment grid or checklists your teachers provide to
          formulate your learning target as precisely as possible)
        </small>
      </p>
      <div className="goal-table">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="goal-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                checked={goal.checked}
                onChange={(e) => handleCheck(goal.id, e.target.checked)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                placeholder={`Goal No. ${index + 1}`}
                value={goal.text}
                onChange={(e) => handleInputChange(goal.id, e.target.value)}
                className="goal-textarea"
                rows={2}
              />
            </div>
            <div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                style={{ marginLeft: '8px' }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button onClick={handleAddGoal}>+ Add Goal</button>
      </div>
    </section>
  );
};

export default LearningTarget;
