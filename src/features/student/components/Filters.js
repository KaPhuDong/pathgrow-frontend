import React from 'react';

const Filters = ({
  semesters = [],
  subjects = [],
  selectedSemester = '',
  selectedSubject = '',
  onSemesterChange,
  onSubjectChange,
}) => (
  <div className="d-flex gap-3">
    <select
      className="form-select w-auto"
      value={selectedSemester}
      onChange={(e) => {
        const val = e.target.value;
        onSemesterChange(val === '' ? '' : Number(val));
      }}
      style={{ borderColor: '#00cdd0' }}
    >
      <option value="">Select Semester</option>
      {semesters.map((sem) => (
        <option key={sem.id} value={sem.id}>
          {sem.name}
        </option>
      ))}
    </select>

    <select
      className="form-select w-auto"
      value={selectedSubject}
      onChange={(e) => onSubjectChange(e.target.value)}
      style={{ borderColor: '#00cdd0' }}
    >
      <option value="">Select Subject</option>
      {subjects.map((subj) => (
        <option key={subj.id} value={subj.id}>
          {subj.name}
        </option>
      ))}
    </select>
  </div>
);

export default Filters;
