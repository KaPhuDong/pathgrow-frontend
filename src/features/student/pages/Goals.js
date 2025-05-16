import React, { useState, useEffect } from 'react';
import api from '../../../api/student/api';
import Main from './Main';
import Filters from '../components/Filters';
import GoalRow from '../components/GoalRow';

const {
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  saveGoal,
  // fetchQA,
  sendQuestion,
} = api;

const Goals = () => {
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [inputs, setInputs] = useState({
    expectCourse: '',
    expectTeacher: '',
    expectMyself: '',
  });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [semRes, subjRes] = await Promise.all([
          fetchSemesters(),
          fetchSubjects(),
        ]);
        setSemesters(semRes.data);
        setSubjects(subjRes.data);
        setSelectedSemester(semRes.data[0]?.id?.toString() || '');
        setSelectedSubject(subjRes.data[0]?.id?.toString() || '');
      } catch (err) {
        // setError('Failed to load semesters and subjects.');
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    if (!selectedSemester || !selectedSubject) return;

    const fetchData = async () => {
      setError('');
      try {
        const res = await fetchGoal(Number(selectedSemester), selectedSubject);
        const goalData = res;

        const noGoalData = !goalData || Object.keys(goalData).length === 0;
        setIsNew(noGoalData);

        setInputs({
          expectCourse: goalData?.expect_course || '',
          expectTeacher: goalData?.expect_teacher || '',
          expectMyself: goalData?.expect_myself || '',
        });

        // const qaRes = await fetchQA(Number(selectedSemester), selectedSubject);
        // setQuestion('');
        // setAnswer(qaRes.data.answer || '');
      } catch (err) {
        setInputs({
          expectCourse: '',
          expectTeacher: '',
          expectMyself: '',
        });
        setQuestion('');
        setAnswer('');
      }
    };

    fetchData();
  }, [selectedSemester, selectedSubject]);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const goalPayload = {
        semester: Number(selectedSemester),
        subject: Number(selectedSubject),
        expect_course: inputs.expectCourse,
        expect_teacher: inputs.expectTeacher,
        expect_myself: inputs.expectMyself,
      };

      if (isNew) {
        await api.createGoal(goalPayload);
      } else {
        await api.saveGoal(goalPayload);
      }

      alert('Saved successfully!');
      setIsNew(false);
    } catch (err) {
      alert('Save failed. Please try again.');
      console.error(err);
    }
  };

  const selectedSubjectName =
    subjects.find((s) => s.id.toString() === selectedSubject)?.name || '';

  return (
    <Main>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Filters
            semesters={semesters}
            subjects={subjects}
            selectedSemester={selectedSemester}
            selectedSubject={selectedSubject}
            onSemesterChange={setSelectedSemester}
            onSubjectChange={setSelectedSubject}
          />
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive mb-4">
          <table
            className="table table-bordered"
            style={{ border: '2px solid #00cdd0' }}
          >
            <thead>
              <tr>
                <th
                  colSpan={12}
                  className="text-black text-center fw-bold py-2"
                  style={{ backgroundColor: '#00cdd0' }}
                >
                  SEMESTER {selectedSemester}
                </th>
              </tr>
              <tr>
                {/* <td style={{ width: '30%', border: '1px solid #00cdd0' }}></td> */}
                <td
                  colSpan={12}
                  className="text-center fw-bold"
                  style={{ border: '1px solid #00cdd0' }}
                >
                  {selectedSubjectName}
                </td>
              </tr>
            </thead>
            <tbody>
              <GoalRow
                label="What I expect from the course?"
                value={inputs.expectCourse}
                onChange={(e) =>
                  handleInputChange('expectCourse', e.target.value)
                }
              />
              <GoalRow
                label="What I expect from the teacher & instructor?"
                value={inputs.expectTeacher}
                onChange={(e) =>
                  handleInputChange('expectTeacher', e.target.value)
                }
              />
              <GoalRow
                label="What I expect from myself?"
                value={inputs.expectMyself}
                onChange={(e) =>
                  handleInputChange('expectMyself', e.target.value)
                }
              />
            </tbody>
          </table>
        </div>

        {/* Q&A Section (commented out) */}
        {/* <div className="shadow-sm rounded">
          <div className="card-body p-4">
            <p className="fw-semibold mb-2">
              <strong>Note:</strong> If you have any questions for the teacher
              or need help, please write below.
            </p>
            <textarea
              className="form-control mb-3"
              rows={3}
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ borderColor: '#00cdd0' }}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendQuestion}
              disabled={!question.trim()}
            >
              Send
            </button>
            {answer && <div className="alert alert-success mt-3">{answer}</div>}
          </div>
        </div> */}
      </div>
    </Main>
  );
};

export default Goals;
