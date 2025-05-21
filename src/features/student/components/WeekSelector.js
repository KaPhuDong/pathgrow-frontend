import React from 'react';
import api from '../../../api/student/api';

const WeekSelector = ({ weeks, setWeeks, selectedWeek, setSelectedWeek }) => {
  const handleAddWeek = async () => {
    try {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 6);

      const newWeekData = {
        name: `Week ${weeks.length + 1}`,
        start_date: today.toISOString().split('T')[0],
        end_date: nextWeek.toISOString().split('T')[0],
      };

      // 1. Tạo tuần mới
      const newWeek = await api.createWeek(newWeekData);
      console.log(newWeek.id);

      // 2. Tạo in_class_plan gắn với weekly_study_plan_id
      const newPlan = await api.createInClassPlan({
        weekly_study_plan_id: newWeek.id,
      });

      // 3. Tạo in_class_subject gắn với in_class_plan_id
      await api.createInClassSubject({
        in_class_plan_id: newPlan.id,
      });

      // 4. Cập nhật UI
      setWeeks([
        ...weeks,
        {
          ...newWeek,
          title: newWeek.name,
          startDate: newWeek.start_date,
          endDate: newWeek.end_date,
          isEditing: false,
        },
      ]);
    } catch (err) {
      console.error('Failed to add new week:', err);
      alert('Failed to add new week');
    }
  };

  const handleDeleteWeek = async (id) => {
    try {
      await api.deleteWeek(id);
      const filtered = weeks.filter((w) => w.id !== id);
      setWeeks(filtered);
      if (selectedWeek >= filtered.length) {
        setSelectedWeek(filtered.length - 1);
      }
    } catch (err) {
      console.error('Failed to delete week:', err);
      alert('Failed to delete the week');
    }
  };

  const handleSaveEdit = async (index) => {
    const week = weeks[index];
    try {
      const updated = await api.updateWeek(week.id, {
        name: week.title,
        start_date: week.startDate,
        end_date: week.endDate,
      });
      const updatedWeeks = [...weeks];
      updatedWeeks[index] = {
        ...updatedWeeks[index],
        ...updated,
        isEditing: false,
        title: updated.name,
        startDate: updated.start_date,
        endDate: updated.end_date,
      };
      setWeeks(updatedWeeks);
    } catch (err) {
      console.error('Failed to update week:', err);
      alert('Failed to update the week');
    }
  };

  return (
    <div className="week-selector">
      {weeks.map((week, index) => (
        <div
          key={week.id}
          className={`week-button ${
            selectedWeek === index ? 'active-week' : ''
          }`}
          onClick={() => setSelectedWeek(index)}
          style={{
            border:
              selectedWeek === index ? '1px solid #007bff' : '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {week.isEditing ? (
            <>
              <input
                type="text"
                value={week.title}
                onChange={(e) => {
                  const updated = [...weeks];
                  updated[index].title = e.target.value;
                  setWeeks(updated);
                }}
                onClick={(e) => e.stopPropagation()}
                className="week-title-input"
                style={{ marginBottom: '6px', padding: '4px' }}
              />
              <div className="week-dates-edit" style={{ marginBottom: '6px' }}>
                <input
                  type="date"
                  value={week.startDate}
                  onChange={(e) => {
                    const updated = [...weeks];
                    updated[index].startDate = e.target.value;
                    setWeeks(updated);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginRight: '6px' }}
                />
                <span> - </span>
                <input
                  type="date"
                  value={week.endDate}
                  onChange={(e) => {
                    const updated = [...weeks];
                    updated[index].endDate = e.target.value;
                    setWeeks(updated);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginLeft: '6px' }}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="week-title"
                style={{ fontWeight: 'bold', marginBottom: '6px' }}
              >
                {week.title}
              </div>
              <div className="week-date" style={{ marginBottom: '6px' }}>
                {week.startDate} - {week.endDate}
              </div>
            </>
          )}

          {selectedWeek === index && (
            <div
              className="week-actions"
              style={{ display: 'flex', gap: '8px', marginTop: '4px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  week.isEditing
                    ? handleSaveEdit(index)
                    : setWeeks((prev) => {
                        const updated = [...prev];
                        updated[index].isEditing = true;
                        return updated;
                      })
                }
                style={{ padding: '4px 8px', cursor: 'pointer' }}
              >
                {week.isEditing ? '✔️ Save' : 'Edit'}
              </button>
              <button
                onClick={() => handleDeleteWeek(week.id)}
                style={{ padding: '4px 8px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddWeek} className="add-button">
        Add Week
      </button>
    </div>
  );
};

export default WeekSelector;
