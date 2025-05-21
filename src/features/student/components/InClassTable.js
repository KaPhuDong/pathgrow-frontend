import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import api from '../../../api/student/api';

const InClassTable = forwardRef(({ weekId }, ref) => {
  const [skills, setSkills] = useState([]);
  const [rows, setRows] = useState([]);
  const [inClassPlanId, setInClassPlanId] = useState(null);

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
        setInClassPlanId(currentPlanId);
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
      console.log('CreatedSubject:', createdSubject);

      if (!createdSubject || !createdSubject.id) {
        throw new Error('Lỗi: Không nhận được subject hợp lệ từ API');
      }

      setRows((prev) => [
        ...prev,
        {
          id: createdSubject.id,
          ...createdSubject,
          isDirty: false,
        },
      ]);
    } catch (error) {
      console.error('Lỗi khi thêm dòng in-class:', error);
      alert('Không thể thêm dòng. Vui lòng thử lại.');
    }
  };

  const handleRemoveRow = async (indexToRemove) => {
    const rowToDelete = rows[indexToRemove];

    // Nếu có ID (đã được lưu trên server), gọi API để xóa
    if (rowToDelete.id) {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this row?'
      );
      if (!confirmDelete) return;

      try {
        await api.deleteInClassSubject(rowToDelete.id);
      } catch (error) {
        console.error('Error deleting in-class subject:', error);
        alert('Failed to delete the row.');
        return;
      }
    }

    // Cập nhật lại rows
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
              <td>
                <textarea
                  rows="2"
                  value={row.my_difficulties || ''}
                  onChange={(e) =>
                    handleChange(index, 'my_difficulties', e.target.value)
                  }
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
});

export default InClassTable;
