import React, { useState, useEffect } from 'react';
import api from '../../../api/student/api';

const SelfStudyTable = () => {
  const [skills, setSkills] = useState([]);
  const [rows, setRows] = useState([{}]); // Khởi tạo 1 dòng

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await api.fetchSubjects(); // result = { message, data }
        setSkills(result.data); // chỉ lấy phần data để set state
      } catch (error) {
        console.error('Failed to fetch skills:', error);
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

  const renderRow = (index) => (
    <tr key={index}>
      <td>
        <input type="date" />
      </td>
      <td>
        <select className="form-select">
          <option value="">-- Select Skill --</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <textarea rows="2" />
      </td>
      <td>
        <textarea rows="2" />
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
          <option value="no">No</option>
          <option value="notSure">Not sure</option>
        </select>
      </td>
      <td>
        <select className="form-select">
          <option value="">-- Select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="notSure">Not sure</option>
        </select>
      </td>
      <td>
        <textarea rows="2" />
      </td>
      <td>
        <textarea rows="2" />
      </td>
      <td>
        <textarea rows="2" />
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
  );

  return (
    <>
      <h3 className="section-title">Self - Study</h3>
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
            <th className="table-header">Time Allocation</th>
            <th className="table-header">Learning Resources</th>
            <th className="table-header">Learning Activities</th>
            <th className="table-header">Concentration</th>
            <th className="table-header">Plan & Follow Plan</th>
            <th className="table-header">Evaluation of My Work</th>
            <th className="table-header">Reinforcing Learning</th>
            <th className="table-header">Notes</th>
            <th
              className="table-header"
              style={{ width: '65px', textAlign: 'center' }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>{rows.map((_, index) => renderRow(index))}</tbody>
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
