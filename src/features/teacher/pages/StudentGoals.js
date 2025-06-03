import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/teacher/api';
import Main2 from './Main2';
import Filters from '../components/Filters';
import GoalRow from '../components/GoalRow';
import ToastNotification from '../../../components/ui/ToastNotification';

const {
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  saveGoal,
  // fetchQA,
  sendQuestion,
} = api;

const StudentGoals = () => {
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
  const [showToast, setShowToast] = useState(false);
  const { studentId } = useParams();
  console.log('studentId from URL:', studentId);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [semRes, subjRes] = await Promise.all([
          fetchSemesters(),
          fetchSubjects(),
        ]);
        setSemesters(semRes.data);
        setSubjects(subjRes);
        setSelectedSemester(semRes.data[0]?.id?.toString() || '');
        setSelectedSubject(subjRes[0]?.id?.toString() || '');
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
        const res = await fetchGoal(
          Number(studentId),
          Number(selectedSemester),
          selectedSubject
        );
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

  const selectedSubjectName =
    subjects.find((s) => s.id.toString() === selectedSubject)?.name || '';

  return (
    <Main2>
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
        </div>

        {showToast && (
          <ToastNotification
            message="Saved successfully!"
            onClose={() => setShowToast(false)}
          />
        )}

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
              />
              <GoalRow
                label="What I expect from the teacher & instructor?"
                value={inputs.expectTeacher}
              />
              <GoalRow
                label="What I expect from myself?"
                value={inputs.expectMyself}
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
    </Main2>
  );
};

export default StudentGoals;
