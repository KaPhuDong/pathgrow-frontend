import Main from './Main';

const StudyPlan = () => {
  return (
    <Main>
      <div className="study-plan-container">
        {/* My learning target */}
        <section className="learning-target">
          <h3>My learning target</h3>
          <p>
            At the end of this period learning, what exactly would I like to be
            able to do in the language?
            <br />
            <small>
              (Use the assessment grid or checklists your teachers provide to
              formulate your learning target as precisely as possible)
            </small>
          </p>

          <div className="goal-table">
            <div className="goal-cell">
              <input type="checkbox" />
            </div>
            <div className="goal-cell">
              <input type="checkbox" />
            </div>
            <div className="goal-cell">
              <input type="checkbox" />
            </div>

            <div className="goal-label">
              <textarea placeholder="Goal No. 1" className="goal-textarea" />
            </div>
            <div className="goal-label">
              <textarea placeholder="Goal No. 2" className="goal-textarea" />
            </div>
            <div className="goal-label">
              <textarea placeholder="Goal No. 3" className="goal-textarea" />
            </div>
          </div>
        </section>

        {/* My learning journal */}
        <section className="learning-journal">
          <h3>My learning journal</h3>
          <p>
            This learning journal allows me to document my learning step by
            step.
            <br />
            This process enables me to become more aware of learning objectives
            and learning paths and to develop learning strategies.
          </p>
        </section>

        {/* In-Class Table */}
        <section className="in-class-section">
          <h3 className="in-class-title">In - Class</h3>
          <table className="study-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skills/Module</th>
                <th>
                  My lesson
                  <br />
                  <small>What did I learn today?</small>
                </th>
                <th>
                  Self-assessment
                  <br />
                  <small>
                    1 = I need more practice
                    <br />2 = Sometimes I find this difficult
                    <br />3 = No problem!
                  </small>
                </th>
                <th>My difficulties</th>
                <th>My Plan</th>
                <th>Problem solved</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td>
                    <input type="text" className="cell-input" />
                  </td>{' '}
                  {/* Date */}
                  <td>
                    <input type="text" className="cell-input" />
                  </td>{' '}
                  {/* Skills/Module */}
                  <td>
                    <input className="cell-input" />
                  </td>{' '}
                  {/* My lesson */}
                  <td>
                    <select className="cell-input">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>{' '}
                  {/* Self-assessment */}
                  <td>
                    <input className="cell-input" />
                  </td>{' '}
                  {/* My difficulties */}
                  <td>
                    <input className="cell-input" />
                  </td>{' '}
                  {/* My Plan */}
                  <td>
                    <select className="cell-input">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </td>{' '}
                  {/* Problem Solved */}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Self-study Table */}
        <section className="self-study-section">
          <h3 className="self-study-title">Self - study</h3>
          <table className="self-study-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skills/Module</th>
                <th>
                  My lesson
                  <br />
                  <small>What did I learn today?</small>
                </th>
                <th>Time allocation</th>
                <th>Learning resources</th>
                <th>Learning activities</th>
                <th>Focus & planning</th>
                <th>Evaluation of my work</th>
                <th>Reinforcing learning</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input className="self-input" />
                  </td>
                  <td>
                    <input className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                  <td>
                    <input type="text" className="self-input" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="week-list-container">
          {/* Week Items */}
          <div className="week-box">
            <div className="week-title">Week 1</div>
            <div className="week-date">1/5/2025 - 7/5/2025</div>
          </div>

          <div className="week-box">
            <div className="week-title">Week 2</div>
            <div className="week-date">8/5/2025 - 14/5/2025</div>
          </div>

          <div className="week-box">
            <div className="week-title">Week 3</div>
            <div className="week-date">15/5/2025 - 21/5/2025</div>
          </div>

          <div className="week-box">
            <div className="week-title">Week 4</div>
            <div className="week-date">22/5/2025 - 27/5/2025</div>
          </div>

          {/* Plus button */}
          <button className="add-button">+</button>
        </div>
      </div>
    </Main>
  );
};

export default StudyPlan;
