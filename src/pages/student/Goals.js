import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main';

const semesters = [1, 2, 3, 4, 5, 6];
const subjects = [
  { key: 'it', label: 'IT English' },
  { key: 'toeic', label: 'TOEIC English' },
  { key: 'comm', label: 'Communicative English' }
];

const GoalRow = ({ label, value, onChange }) => (
  <tr>
    <td style={{ border: '1px solid #00cdd0', backgroundColor: '#f0f8ff' }}>{label}</td>
    <td style={{ border: '1px solid #00cdd0' }}>
      <textarea
        className="form-control border-0"
        rows="3"
        value={value}
        onChange={onChange}
        style={{ borderColor: '#00cdd0' }}
      />
    </td>
  </tr>
);

const Goals = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('it');
  const [inputs, setInputs] = useState({ expectCourse: '', expectTeacher: '', expectMyself: '' });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoal();
    fetchQA();
  }, [selectedSemester, selectedSubject]);

  const fetchGoal = async () => {
    setLoadingData(true);
    setError('');
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/goals?semester=${selectedSemester}&subject=${selectedSubject}`);
      const goalData = res.data[0]; // API trả về mảng

      setInputs(goalData
        ? {
          expectCourse: goalData.expect_course || '',
          expectTeacher: goalData.expect_teacher || '',
          expectMyself: goalData.expect_myself || ''
        }
        : { expectCourse: '', expectTeacher: '', expectMyself: '' });
    } catch (error) {
      console.error('Error fetching goal:', error);
      setError('Failed to load goal data.');
    } finally {
      setLoadingData(false);
    }
  };

  const fetchQA = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/goal-questions?semester=${selectedSemester}&subject=${selectedSubject}`);
      setQuestion(res.data.question || '');
      setAnswer(res.data.answer || '');
    } catch (error) {
      console.error('Error fetching Q&A:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/goals', {
        semester: selectedSemester,
        subject: selectedSubject,
        expect_course: inputs.expectCourse,
        expect_teacher: inputs.expectTeacher,
        expect_myself: inputs.expectMyself
      });
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving goal:', error);
      alert('Failed to save. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      alert('Please enter a question before sending.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/goal-questions', {
        semester: selectedSemester,
        subject: selectedSubject,
        question: question.trim()
      });
      alert('Question sent.');
      setQuestion('');
      fetchQA();
    } catch (error) {
      console.error('Error sending question:', error);
      alert('Failed to send question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <div className="container mt-4">
        {/* Filters and Save button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-3">
            <select
              className="form-select w-auto"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              style={{ borderColor: '#00cdd0' }}
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>

            <select
              className="form-select w-auto"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ borderColor: '#00cdd0' }}
            >
              {subjects.map((subj) => (
                <option key={subj.key} value={subj.key}>
                  {subj.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn"
            style={{ backgroundColor: '#00cdd0', color: '#fff' }}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Goal Table */}
        {error && <div className="alert" style={{ backgroundColor: '#e74c3c', color: '#fff' }}>{error}</div>}
        {loadingData ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive mb-4">
            <table className="table table-bordered" style={{ border: '2px solid #00cdd0' }}>
              <thead>
                <tr style={{ backgroundColor: '#00cdd0' }}>
                  <th colSpan={2} className="text-white text-center fw-bold py-2 w-100" style={{ backgroundColor: '#00cdd0' }}>
                    SEMESTER {selectedSemester}
                  </th>
                </tr>
                <tr>
                  <td style={{ width: '30%', border: '1px solid #00cdd0' }}></td>
                  <td className="text-center fw-bold" style={{ border: '1px solid #00cdd0' }}>
                    {subjects.find(s => s.key === selectedSubject)?.label}
                  </td>
                </tr>
              </thead>
              <tbody>
                <GoalRow
                  label="What I expect from the course?"
                  value={inputs.expectCourse}
                  onChange={(e) => handleInputChange('expectCourse', e.target.value)}
                />
                <GoalRow
                  label="What I expect from the teacher & instructor?"
                  value={inputs.expectTeacher}
                  onChange={(e) => handleInputChange('expectTeacher', e.target.value)}
                />
                <GoalRow
                  label="What I expect from myself?"
                  value={inputs.expectMyself}
                  onChange={(e) => handleInputChange('expectMyself', e.target.value)}
                />
              </tbody>
            </table>
          </div>
        )}

        {/* Q&A Section */}
        <div className="shadow-sm rounded">
          <div className="card-body p-4">
            <p className="fw-semibold mb-2">
              <strong>Note:</strong> If you have any questions for the teacher or need help, feel free to include them here.
            </p>
            <textarea
              className="form-control mb-3"
              rows="2"
              placeholder="I want you to check my goal"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ borderColor: '#00cdd0' }}
            />
            <div className="text-end mb-3">
              <button
                className="btn"
                style={{ backgroundColor: '#00cdd0', color: '#fff' }}
                onClick={handleSendQuestion}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {answer && (
              <div className="alert alert-info">
                <strong>Teacher's Reply:</strong>
                <p className="mb-0">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Goals;
