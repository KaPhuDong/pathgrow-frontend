import React, { useState } from 'react';

import Main from './Main';

const Goals = () => {
  const [activeTab, setActiveTab] = useState('semester-table');
  const [inputs, setInputs] = useState({
    expectCourse: { it: '', toeic: '', comm: '' },
    expectTeacher: { it: '', toeic: '', comm: '' },
    expectMyself: { it: '', toeic: '', comm: '' },
  });

  // Hàm xử lý thay đổi dữ liệu mà không dùng spread operator
  const handleChange = (row, col, value) => {
    const newInputs = {}; // Tạo đối tượng mới

    // Sao chép các thuộc tính của inputs vào newInputs
    for (let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        newInputs[key] = Object.assign({}, inputs[key]); // Sao chép từng đối tượng con
      }
    }

    // Cập nhật giá trị mới vào newInputs
    newInputs[row][col] = value;

    // Cập nhật state với newInputs
    setInputs(newInputs);
  };

  return (
    <Main>
      <div className="container mt-4">
        {/* Nội dung Tab: Bảng mục tiêu học kỳ */}
        {activeTab === 'semester-table' && (
          <div className="border-0 shadow-sm mt-3">
            <div className="card-body">
              <div className="mb-4">
                <h5 className="card-title fw-bold text-success">
                  Semester goals
                </h5>
                <p className="card-text text-muted mb-1">
                  What do you expect from the course and my teachers?
                </p>
                <p className="card-text text-muted">
                  After the semester, what exactly would I like to be able to do
                  in the language?
                </p>
              </div>

              {/* Bảng nhập dữ liệu */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        colSpan={4}
                        className="text-center text-white"
                        style={{ backgroundColor: '#00cece' }}
                      >
                        SEMESTER 1
                      </th>
                    </tr>
                    <tr className="table-light">
                      <th style={{ width: '25%' }}></th>
                      <th className="text-center">IT English</th>
                      <th className="text-center">TOEIC English</th>
                      <th className="text-center">Communication English</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-light">
                        <strong>What I expect from the course?</strong>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectCourse.it}
                          onChange={(e) =>
                            handleChange('expectCourse', 'it', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectCourse.toeic}
                          onChange={(e) =>
                            handleChange(
                              'expectCourse',
                              'toeic',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectCourse.comm}
                          onChange={(e) =>
                            handleChange('expectCourse', 'comm', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="table-light">
                        <strong>
                          What I expect from the teacher & instructor?
                        </strong>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectTeacher.it}
                          onChange={(e) =>
                            handleChange('expectTeacher', 'it', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectTeacher.toeic}
                          onChange={(e) =>
                            handleChange(
                              'expectTeacher',
                              'toeic',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectTeacher.comm}
                          onChange={(e) =>
                            handleChange(
                              'expectTeacher',
                              'comm',
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="table-light">
                        <strong>What I expect from myself?</strong>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectMyself.it}
                          onChange={(e) =>
                            handleChange('expectMyself', 'it', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectMyself.toeic}
                          onChange={(e) =>
                            handleChange(
                              'expectMyself',
                              'toeic',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={inputs.expectMyself.comm}
                          onChange={(e) =>
                            handleChange('expectMyself', 'comm', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Goals;
