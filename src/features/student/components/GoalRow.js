import React from 'react';

const GoalRow = ({ label, value, onChange }) => (
  <tr>
    <td
      style={{ width: '30%', border: '1px solid #00cdd0', fontWeight: '600' }}
    >
      {label}
    </td>
    <td style={{ border: '1px solid #00cdd0' }}>
      <textarea
        className="form-control"
        rows={2}
        value={value}
        onChange={onChange}
        style={{ borderColor: '#00cdd0' }}
      />
    </td>
  </tr>
);

export default GoalRow;
