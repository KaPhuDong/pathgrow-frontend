import React, { useState, useEffect } from 'react';
import api from '../../../api/student/api';

const InClassTable = () => {
  const [skills, setSkills] = useState([]);
  const [rows, setRows] = useState([{}]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await api.fetchSubjects(); // result = { message, data }
        setSkills(result.data); // lấy phần data thôi
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }
    };

    loadSkills();
  }, []);

  const handleAddRow = () => {
    setRows((prev) => [...prev, {}]);
  };

  const handleRemoveRow = (indexToRemove) => {
    setRows((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <h3 className="section-title">In - Class</h3>
      <table className="log-table">
        <thead>
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Skills/Module</th>
            <th className="table-header">
              My lesson
              <br />
              <small>What did I learn today?</small>
            </th>
            <th className="table-header">
              Self-assessment
              <br />
              <small>
                1 = I need more practice
                <br />
                2 = Sometimes I find this difficult
                <br />3 = No problem!
              </small>
            </th>
            <th className="table-header">My difficulties</th>
            <th className="table-header">My Plan</th>
            <th className="table-header">Problem solved</th>
            <th
              className="table-header"
              style={{ width: '65px', textAlign: 'center' }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td>
                <input type="date" />
              </td>
              <td>
                <select className="form-select">
                  <option value="">-- Select Skill --</option>
                  {skills.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <textarea rows="2" />
              </td>
              <td>
                <select className="form-select">
                  <option value="">-- Select --</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </td>
              <td>
                <textarea rows="2" />
              </td>
              <td>
                <textarea rows="2" />
              </td>
              <td>
                <select className="form-select">
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="notYet">Not yet</option>
                </select>
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
            <td colSpan="8" style={{ textAlign: 'right', paddingTop: '10px' }}>
              <button onClick={handleAddRow}>Add Row</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default InClassTable;
