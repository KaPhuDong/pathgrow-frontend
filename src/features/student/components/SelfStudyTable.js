import React, { useState, useEffect } from 'react';
import api from '../../../api/student/api';

const SelfStudyTable = () => {
  const [skills, setSkills] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await api.fetchSubjects();
        setSkills(result.data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };
    loadSkills();
  }, []);

  const handleAddRow = () => {
    const newRow = {
      date: '',
      subject_id: '',
      topic: '',
      my_plan: '',
      difficulties: '',
      self_solution: '',
      google_used: '',
      asked_others: '',
      resources: '',
      result: '',
      reflection: '',
      isDirty: false,
    };
    setRows((prev) => [...prev, newRow]);
  };

  const handleRemoveRow = (indexToRemove) => {
    setRows((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
        isDirty: true,
      };
      return updated;
    });
  };

  return (
    <>
      <h3 className="section-title">Self - Study</h3>
      <table className="log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Skill/Module</th>
            <th>Topic</th>
            <th>My Plan</th>
            <th>Difficulties</th>
            <th>Self Solution</th>
            <th>Used Google?</th>
            <th>Asked Others?</th>
            <th>Resources</th>
            <th>Result</th>
            <th>Reflection</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={row.date || ''}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={row.subject_id || ''}
                  onChange={(e) =>
                    handleChange(index, 'subject_id', e.target.value)
                  }
                >
                  <option value="">-- Select Skill --</option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.topic || ''}
                  onChange={(e) => handleChange(index, 'topic', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.my_plan || ''}
                  onChange={(e) =>
                    handleChange(index, 'my_plan', e.target.value)
                  }
                />
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.difficulties || ''}
                  onChange={(e) =>
                    handleChange(index, 'difficulties', e.target.value)
                  }
                />
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.self_solution || ''}
                  onChange={(e) =>
                    handleChange(index, 'self_solution', e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={row.google_used || ''}
                  onChange={(e) =>
                    handleChange(index, 'google_used', e.target.value)
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="notSure">Not sure</option>
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  value={row.asked_others || ''}
                  onChange={(e) =>
                    handleChange(index, 'asked_others', e.target.value)
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="notSure">Not sure</option>
                </select>
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.resources || ''}
                  onChange={(e) =>
                    handleChange(index, 'resources', e.target.value)
                  }
                />
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.result || ''}
                  onChange={(e) =>
                    handleChange(index, 'result', e.target.value)
                  }
                />
              </td>
              <td>
                <textarea
                  rows="2"
                  value={row.reflection || ''}
                  onChange={(e) =>
                    handleChange(index, 'reflection', e.target.value)
                  }
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <button
                  onClick={() => handleRemoveRow(index)}
                  style={{ padding: '2px 6px' }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="12" style={{ textAlign: 'right', paddingTop: '10px' }}>
              <button onClick={handleAddRow}>Add Row</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default SelfStudyTable;
