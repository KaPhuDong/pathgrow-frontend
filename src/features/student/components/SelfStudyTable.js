import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import api from '../../../api/student/api';

const InClassTable = forwardRef(
  ({ weekId, selfStudyPlanId, setSelfStudyPlanId }, ref) => {
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
          const result = await api.fetchSelfStudySubjects(weekId);
          const formatted = result.map((item) => ({
            ...item,
            subject_name:
              skills.find((s) => s.id === item.subject_id)?.name || '',
            isDirty: false,
          }));
          setRows(formatted);
        } catch (error) {
          console.error('Failed to fetch self-study subjects:', error);
        }
      };

      fetchData();
    }, [weekId, skills]);

    const handleAddRow = async () => {
      try {
        let currentPlanId = selfStudyPlanId;

        if (!currentPlanId) {
          const plan = await api.createSelfStudyPlan({
            weekly_study_plan_id: weekId,
          });

          currentPlanId = plan.id;
          setSelfStudyPlanId(currentPlanId); // update parent state
        }

        const newSubject = {
          self_study_plan_id: currentPlanId,
          date: '',
          subject_id: '',
          my_lesson: '',
          time_allocation: '',
          self_assessment: '',
          learning_resources: '',
          learning_activities: '',
          concentration: '',
          plan_follow_reflection: '',
          evaluation: '',
          reinforcing_learning: '',
          notes: '',
        };

        const createdSubject = await api.createSelfStudySubject(newSubject);

        setRows((prev) => [
          ...prev,
          {
            id: createdSubject.id,
            ...createdSubject,
            isDirty: false,
          },
        ]);
      } catch (error) {
        console.error('Error adding self-study row:', error);
        alert('Could not add row. Please try again.');
      }
    };

    const handleRemoveRow = async (indexToRemove) => {
      const rowToDelete = rows[indexToRemove];

      if (rowToDelete.id) {
        const confirmDelete = window.confirm(
          'Are you sure you want to delete this row?'
        );
        if (!confirmDelete) return;

        try {
          await api.deleteSelfStudySubject(rowToDelete.id);
        } catch (error) {
          console.error('Error deleting self-study subject:', error);
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
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={row.date || ''}
                    onChange={(e) =>
                      handleChange(index, 'date', e.target.value)
                    }
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
                    {skills.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.my_lesson || ''}
                    onChange={(e) =>
                      handleChange(index, 'my_lesson', e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.time_allocation || ''}
                    onChange={(e) =>
                      handleChange(index, 'time_allocation', e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.learning_resources || ''}
                    onChange={(e) =>
                      handleChange(index, 'learning_resources', e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.learning_activities || ''}
                    onChange={(e) =>
                      handleChange(index, 'learning_activities', e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={row.concentration || ''}
                    onChange={(e) =>
                      handleChange(index, 'concentration', e.target.value)
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={row.plan_follow_reflection || ''}
                    onChange={(e) =>
                      handleChange(
                        index,
                        'plan_follow_reflection',
                        e.target.value
                      )
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.evaluation || ''}
                    onChange={(e) =>
                      handleChange(index, 'evaluation', e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.reinforcing_learning || ''}
                    onChange={(e) =>
                      handleChange(
                        index,
                        'reinforcing_learning',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={row.notes || ''}
                    onChange={(e) =>
                      handleChange(index, 'notes', e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleRemoveRow(index)}
                    style={{ padding: '2px 6px' }}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="12"
                style={{ textAlign: 'right', paddingTop: '10px' }}
              >
                <button onClick={handleAddRow}>Add Row</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
);

export default InClassTable;
