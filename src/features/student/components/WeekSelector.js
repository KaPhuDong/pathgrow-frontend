import React, { useState, useEffect } from 'react';

const getWeekRange = (startDate) => {
  const end = new Date(startDate);
  end.setDate(end.getDate() + 6);
  return {
    start: startDate.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

const WeekSelector = ({ selectedWeek, setSelectedWeek }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const today = new Date();
    const { start, end } = getWeekRange(today);
    setWeeks([
      {
        id: 1,
        title: 'Week 1',
        startDate: start,
        endDate: end,
        isEditing: false,
      },
    ]);
  }, []);

  const handleAddWeek = () => {
    const newId = weeks.length + 1;
    const lastWeek = weeks[weeks.length - 1];
    const nextStart = new Date(lastWeek.endDate);
    nextStart.setDate(nextStart.getDate() + 1);
    const { start, end } = getWeekRange(nextStart);

    setWeeks([
      ...weeks,
      {
        id: newId,
        title: `Week ${newId}`,
        startDate: start,
        endDate: end,
        isEditing: false,
      },
    ]);
  };

  const handleDeleteWeek = (id) => {
    if (weeks.length === 1) {
      alert('You must have at least one week.');
      return;
    }

    const updated = weeks.filter((week) => week.id !== id);
    setWeeks(updated);

    if (selectedWeek >= updated.length) {
      setSelectedWeek(updated.length - 1);
    }
  };

  const handleToggleEdit = (index) => {
    const updated = [...weeks];
    updated[index].isEditing = !updated[index].isEditing;
    setWeeks(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...weeks];
    updated[index][field] = value;
    setWeeks(updated);
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
            <input
              type="text"
              value={week.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="week-title-input"
              style={{ marginBottom: '6px', padding: '4px' }}
            />
          ) : (
            <div
              className="week-title"
              style={{ fontWeight: 'bold', marginBottom: '6px' }}
            >
              {week.title}
            </div>
          )}

          {week.isEditing ? (
            <div className="week-dates-edit" style={{ marginBottom: '6px' }}>
              <input
                type="date"
                value={week.startDate}
                onChange={(e) =>
                  handleChange(index, 'startDate', e.target.value)
                }
                onClick={(e) => e.stopPropagation()}
                style={{ marginRight: '6px' }}
              />
              <span> - </span>
              <input
                type="date"
                value={week.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ marginLeft: '6px' }}
              />
            </div>
          ) : (
            <div className="week-date" style={{ marginBottom: '6px' }}>
              {week.startDate} - {week.endDate}
            </div>
          )}

          {/* Hiển thị nút Edit / Delete chỉ khi tuần đang được chọn */}
          {selectedWeek === index && (
            <div
              className="week-actions"
              style={{ display: 'flex', gap: '8px', marginTop: '4px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleToggleEdit(index)}
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
