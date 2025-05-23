import React from 'react';

const GoalRow = ({ label, value, onChange }) => (
  <tr className="row-goal">
    <td
      colSpan={4}
      style={{
        width: '30%',
        border: '1px solid var(--primary)',
        fontWeight: '600',
      }}
    >
      {label}
    </td>
    <td
      colSpan={8}
      style={{ border: '1px solid var(--primary)', height: '150px' }}
    >
      <textarea
        className="form-control text-goal"
        rows={2}
        value={value}
        onChange={onChange}
      />
    </td>
  </tr>
);

export default GoalRow;
