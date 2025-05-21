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
  const [selfStudyPlanId, setSelfStudyPlanId] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('in-class');
  const [toastMessage, setToastMessage] = useState('');

  const inClassRef = useRef(null);
  const selfStudyRef = useRef(null);
  const learningTargetRef = useRef(null);

  const selectedWeekId = weeks[selectedWeek]?.id;

  // Fetch weeks list
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

  // Fetch plan IDs (in-class or self-study)
  useEffect(() => {
    const fetchPlans = async () => {
      if (!selectedWeekId) return;

      if (activeTab === 'in-class') {
        try {
          const res = await api.fetchInClassPlanIdByWeek(selectedWeekId);
          setInClassPlanId(res?.id || null);
        } catch (err) {
          console.error('Failed to fetch inClassPlanId:', err);
          setInClassPlanId(null);
        }
      } else if (activeTab === 'self-study') {
        try {
          const res = await api.fetchSelfStudyPlanIdByWeek(selectedWeekId);
          setSelfStudyPlanId(res?.id || null);
        } catch (err) {
          console.error('Failed to fetch selfStudyPlanId:', err);
          setSelfStudyPlanId(null);
        }
      }
    };

    fetchPlans();
  }, [selectedWeekId, activeTab]);

  // Save handler
  const handleSave = async () => {
    try {
      const goals = learningTargetRef.current?.getCurrentData?.() || [];
      const dirtyGoals = goals.filter((g) => g.isDirty && g.id);

      await Promise.all(
        dirtyGoals.map((goal) =>
          api.updateWeeklyGoal(goal.id, {
            name: goal.text,
            completed: goal.checked ? 1 : 0,
          })
        )
      );

      if (activeTab === 'in-class') {
        const subjects = inClassRef.current?.getCurrentData?.() || [];
        const dirtySubjects = subjects.filter((s) => s.isDirty && s.id);

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
      } else if (activeTab === 'self-study') {
        const studies = selfStudyRef.current?.getCurrentData?.() || [];
        const dirtyStudies = studies.filter((s) => s.isDirty && s.id);

        await Promise.all(
          dirtyStudies.map((item) =>
            api.updateSelfStudySubject(item.id, {
              date: item.date,
              subject_id: item.subject_id,
              my_lesson: item.my_lesson,
              time_allocation: item.time_allocation,
              self_assessment: item.self_assessment,
              learning_resources: item.learning_resources,
              learning_activities: item.learning_activities,
              concentration: item.concentration,
              plan_follow_reflection: item.plan_follow_reflection,
              evaluation: item.evaluation,
              reinforcing_learning: item.reinforcing_learning,
              notes: item.notes,
            })
          )
        );
      }

      setToastMessage('Saved successfully!');
    } catch (err) {
      console.error('Failed to save:', err);
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
            setInClassPlanId={setInClassPlanId}
          />
        ) : (
          <SelfStudyTable
            ref={selfStudyRef}
            weekId={selectedWeekId}
            selfStudyPlanId={selfStudyPlanId}
            setSelfStudyPlanId={setSelfStudyPlanId}
          />
        )}
        <NoteSection />
      </div>
    </Main>
  );
};

export default StudyPlan;
