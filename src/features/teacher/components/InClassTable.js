import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import api from '../../../api/student/api';

const InClassTable = forwardRef(
  ({ weekId, inClassPlanId, setInClassPlanId }, ref) => {
    const [skills, setSkills] = useState([]);
    const [rows, setRows] = useState([]);

    useImperativeHandle(ref, () => ({
      getCurrentData: () => rows,
    }));

    useEffect(() => {
      const loadSkills = async () => {
        try {
          const result = await api.fetchSubjects();
          setSkills(result.data);
        } catch (error) {
          console.error('Failed to fetch subjects:', error);
        }
      };
      loadSkills();
    }, []);

    useEffect(() => {
      if (!weekId) return;

      const fetchData = async () => {
        try {
          const result = await api.fetchInClassSubjects(weekId);
          const formatted = result.map((item) => ({
            ...item,
            subject_name:
              skills.find((s) => s.id === item.subject_id)?.name || '',
            isDirty: false,
          }));
          setRows(formatted);
        } catch (error) {
          console.error('Failed to fetch in-class subjects:', error);
        }
      };

      fetchData();
    }, [weekId, skills]);

    return (
      <>
        <h3 className="section-title">In - Class</h3>
        <table className="log-table">
          <thead>
            <tr>
              <th className="table-header" style={{ width: '125px' }}>
                Date
              </th>
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
              <th className="table-header" style={{ width: '140px' }}>
                Problem solved
              </th>
              <th
                className="table-header"
                style={{ width: '70px', textAlign: 'center' }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} style={{ height: '150px' }}>
                <td className="table-cell">
                  <input
                    type="date"
                    value={row.date || ''}
                    style={{ width: '105px' }}
                  />
                </td>
                <td className="table-cell">
                  <select className="form-select" value={row.subject_id || ''}>
                    <option value="">-- Select Skill --</option>
                    {skills.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="table-cell">
                  <textarea rows="2" value={row.my_lesson || ''} />
                </td>
                <td className="table-cell">
                  <select
                    className="form-select"
                    value={row.self_assessment || ''}
                  >
                    <option value="">-- Select --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </td>
                <td className="table-cell">
                  <textarea rows="2" value={row.my_difficulties || ''} />
                </td>
                <td className="table-cell">
                  <textarea rows="2" value={row.my_plan || ''} />
                </td>
                <td className="table-cell">
                  <select
                    className="form-select"
                    value={row.problem_solved || ''}
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="Not yet">Not yet</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }} className="table-cell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
);

export default InClassTable;
