import React, { useState } from "react";
import Main from "./Main";

const StudyPlan = () => {
  const [activeTab, setActiveTab] = useState("in-class"); // tab state

  const renderTable = () => {
    if (activeTab === "in-class") {
      return (
        <>
          <h3 className="section-title">In - Class</h3>
          <table className="log-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skills/Module</th>
                <th>
                  My lesson <br />
                  <small>What did I learn today?</small>
                </th>
                <th>
                  Self-assessment <br />
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
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(7)].map((_, i) => (
                    <td key={i}>
                      <textarea rows="2" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return (
        <>
          <h3 className="section-title">Self - Study</h3>
          <table className="log-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skills/Module</th>
                <th>My lesson<br /><small>What did I learn today?</small></th>
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
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(10)].map((_, i) => (
                    <td key={i}>
                      <textarea rows="2" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };

  return (
    <Main>
      <div className="container-study-plan">
        <div className="top-bar">
          <button
            className={activeTab === "in-class" ? "active-tab" : "inactive-tab"}
            onClick={() => setActiveTab("in-class")}
          >
            In - Class
          </button>
          <button
            className={activeTab === "self-study" ? "active-tab" : "inactive-tab"}
            onClick={() => setActiveTab("self-study")}
          >
            Self - study
          </button>
          <button className="save-button">Save</button>
        </div>

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

        {/* Table section (conditionally rendered) */}
        {renderTable()}

        <div className="note-section">
          <p>
            <strong>Note:</strong> If you have any questions for the teacher or
            need help, feel free to include them here.
          </p>
          <textarea placeholder="I want you to check my goal"></textarea>
          <button className="send-button">Send</button>
        </div>

        <div className="week-selector">
          {[
            ["Week 1", "1/5/2025 - 7/5/2025"],
            ["Week 2", "8/5/2025 - 14/5/2025"],
            ["Week 3", "15/5/2025 - 21/5/2025"],
            ["Week 4", "22/5/2025 - 27/5/2025"],
          ].map(([title, date]) => (
            <button key={title}>
              <div className="week-title">{title}</div>
              <div className="week-date">{date}</div>
            </button>
          ))}
          <button className="add-button">+</button>
        </div>
      </div>
    </Main>
  );
};

export default StudyPlan;
