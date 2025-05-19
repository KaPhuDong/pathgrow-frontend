import React, { useState, useEffect } from 'react';
import Main from './Main';
import WeekSelector from '../components/WeekSelector';
import TabSwitcher from '../components/TabSwitcher';
import LearningTarget from '../components/LearningTarget';
import LearningJournal from '../components/LearningJournal';
import InClassTable from '../components/InClassTable';
import SelfStudyTable from '../components/SelfStudyTable';
import NoteSection from '../components/NoteSection';
import api from '../../../api/student/api';

const StudyPlan = () => {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('in-class');

  useEffect(() => {
    api
      .fetchWeeks()
      .then((data) => {
        const formattedWeeks = data.map((week, index) => ({
          id: week.id,
          title: week.name || `Week ${index + 1}`,
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

  return (
    <Main>
      <div className="container-study-plan">
        <WeekSelector
          weeks={weeks}
          setWeeks={setWeeks}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
        <br />
        <br />
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <LearningTarget />
        <br />
        <br />
        <br />

        <LearningJournal />

        {activeTab === 'in-class' ? <InClassTable /> : <SelfStudyTable />}

        <NoteSection />
      </div>
    </Main>
  );
};

export default StudyPlan;
