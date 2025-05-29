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

    const handleAddRow = async () => {
      try {
        let currentPlanId = inClassPlanId;

        if (!currentPlanId) {
          const plan = await api.createInClassPlan({
            weekly_study_plan_id: weekId,
          });

          currentPlanId = plan.id;
          setInClassPlanId(currentPlanId); // update parent state
        }

        const newSubject = {
          in_class_plan_id: currentPlanId,
          date: '',
          subject_id: '',
          my_lesson: '',
          self_assessment: '',
          my_difficulties: '',
          my_plan: '',
          problem_solved: '',
        };

        const createdSubject = await api.createInClassSubject(newSubject);

        setRows((prev) => [
          ...prev,
          {
            id: createdSubject.id,
            ...createdSubject,
            isDirty: false,
          },
        ]);
      } catch (error) {
        console.error('Error adding in-class row:', error);
        alert('Could not add row. Please try again.');
      }
    };

    const handleRemoveRow = async (indexToRemove) => {
      const rowToDelete = rows[indexToRemove];

      if (rowToDelete.id) {
        try {
          await api.deleteInClassSubject(rowToDelete.id);
        } catch (error) {
          console.error('Error deleting in-class subject:', error);
          alert('Failed to delete the row.');
          return;
        }
      }

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
                    onChange={(e) =>
                      handleChange(index, 'date', e.target.value)
                    }
                    style={{ width: '105px' }}
                  />
                </td>
                <td className="table-cell">
                  <select
                    className="form-select"
                    value={row.subject_id || ''}
                    onChange={(e) =>
                      handleChange(index, 'subject_id', e.target.value)
                    }
                  >
                    <option value="">-- Select Skill --</option>
                    {skills.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="table-cell">
                  <textarea
                    rows="2"
                    value={row.my_lesson || ''}
                    onChange={(e) =>
                      handleChange(index, 'my_lesson', e.target.value)
                    }
                  />
                </td>
                <td className="table-cell">
                  <select
                    className="form-select"
                    value={row.self_assessment || ''}
                    onChange={(e) =>
                      handleChange(index, 'self_assessment', e.target.value)
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </td>
                <td className="table-cell">
                  <textarea
                    rows="2"
                    value={row.my_difficulties || ''}
                    onChange={(e) =>
                      handleChange(index, 'my_difficulties', e.target.value)
                    }
                  />
                </td>
                <td className="table-cell">
                  <textarea
                    rows="2"
                    value={row.my_plan || ''}
                    onChange={(e) =>
                      handleChange(index, 'my_plan', e.target.value)
                    }
                  />
                </td>
                <td className="table-cell">
                  <select
                    className="form-select"
                    value={row.problem_solved || ''}
                    onChange={(e) =>
                      handleChange(index, 'problem_solved', e.target.value)
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="Not yet">Not yet</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }} className="table-cell">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    style={{ padding: '2px 6px' }}
                  >
                    <i class="fa-solid fa-xmark delete-icon"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="8"
                style={{ textAlign: 'right', paddingTop: '10px' }}
              >
                <button className="add-row-button" onClick={handleAddRow}>
                  Add Row
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
);

export default InClassTable;
