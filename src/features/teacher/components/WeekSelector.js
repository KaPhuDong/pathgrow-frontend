import React from 'react';
import api from '../../../api/student/api';

const WeekSelector = ({ weeks, setWeeks, selectedWeek, setSelectedWeek }) => {
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
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeekSelector;
