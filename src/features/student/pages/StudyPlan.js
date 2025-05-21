import React, { useState, useEffect, useRef } from 'react';
import Main from './Main';
import WeekSelector from '../components/WeekSelector';
import TabSwitcher from '../components/TabSwitcher';
import LearningTarget from '../components/LearningTarget';
import LearningJournal from '../components/LearningJournal';
import InClassTable from '../components/InClassTable';
import SelfStudyTable from '../components/SelfStudyTable';
import NoteSection from '../components/NoteSection';
import api from '../../../api/student/api';
import ToastNotification from '../../../components/ui/ToastNotification';

const StudyPlan = () => {
  const [weeks, setWeeks] = useState([]);
  const [inClassPlanId, setInClassPlanId] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('in-class');
  const [toastMessage, setToastMessage] = useState('');

  const inClassRef = useRef(null);
  const selfStudyRef = useRef(null);
  const learningTargetRef = useRef(null);

  const selectedWeekId = weeks[selectedWeek]?.id;

  useEffect(() => {
    api
      .fetchWeeks()
      .then((data) => {
        const formattedWeeks = data.map((week, index) => ({
          id: week.id,
          title: week.name || `Week No.${index + 1}`,
          startDate: week.start_date,
          endDate: week.end_date,
          isEditing: false,
        }));
        setWeeks(formattedWeeks);
      })
      .catch((error) => {
        console.error('Failed to fetch weeks:', error);
      });
  }, []);

  useEffect(() => {
    const fetchInClassPlanId = async () => {
      if (selectedWeekId) {
        try {
          const response = await api.fetchInClassPlanIdByWeek(selectedWeekId);
          if (response?.id) {
            setInClassPlanId(response.id);
          } else {
            setInClassPlanId(null);
          }
        } catch (error) {
          console.error('Failed to fetch inClassPlanId:', error);
          setInClassPlanId(null);
        }
      }
    };

    fetchInClassPlanId();
  }, [selectedWeekId, activeTab]);

  const handleSetInClassPlanId = (id) => {
    setInClassPlanId(id);
  };

  const handleSave = async () => {
    const subjects = inClassRef.current?.getCurrentData?.() || [];
    const dirtySubjects = subjects.filter((s) => s.isDirty && s.id);

    const goals = learningTargetRef.current?.getCurrentData?.() || [];
    const dirtyGoals = goals.filter((g) => g.isDirty && g.id);

    try {
      await Promise.all(
        dirtySubjects.map((subject) =>
          api.updateInClassSubject(subject.id, {
            date: subject.date,
            subject_id: subject.subject_id,
            my_lesson: subject.my_lesson,
            self_assessment: subject.self_assessment,
            my_difficulties: subject.my_difficulties,
            my_plan: subject.my_plan,
            problem_solved: subject.problem_solved,
          })
        )
      );

      await Promise.all(
        dirtyGoals.map((goal) =>
          api.updateWeeklyGoal(goal.id, {
            name: goal.text,
            completed: goal.checked ? 1 : 0,
          })
        )
      );

      setToastMessage('Saved successfully!');
    } catch (err) {
      setToastMessage('Failed to save!');
    }
  };

  return (
    <Main>
      <div className="container-study-plan">
        {toastMessage && (
          <ToastNotification
            message={toastMessage}
            onClose={() => setToastMessage('')}
          />
        )}
        <WeekSelector
          weeks={weeks}
          setWeeks={setWeeks}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
        <br />
        <br />
        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSave={handleSave}
        />
        <LearningTarget
          ref={learningTargetRef}
          weekId={selectedWeekId}
          inClassPlanId={inClassPlanId}
        />
        <br />
        <br />
        <br />
        <LearningJournal
          weekId={selectedWeekId}
          inClassPlanId={inClassPlanId}
        />
        {activeTab === 'in-class' ? (
          <InClassTable
            ref={inClassRef}
            weekId={selectedWeekId}
            inClassPlanId={inClassPlanId}
            setInClassPlanId={handleSetInClassPlanId}
          />
        ) : (
          <SelfStudyTable
            ref={selfStudyRef}
            weekId={selectedWeekId}
            studyPlanId={inClassPlanId}
          />
        )}
        <NoteSection />
      </div>
    </Main>
  );
};

export default StudyPlan;
