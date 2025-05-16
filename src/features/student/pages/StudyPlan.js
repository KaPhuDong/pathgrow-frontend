import React, { useState } from 'react';
import Main from './Main';
import WeekSelector from '../components/WeekSelector';
import TabSwitcher from '../components/TabSwitcher';
import LearningTarget from '../components/LearningTarget';
import LearningJournal from '../components/LearningJournal';
import InClassTable from '../components/InClassTable';
import SelfStudyTable from '../components/SelfStudyTable';
import NoteSection from '../components/NoteSection';

const weeks = [
  { title: 'Week 1', date: '1/5/2025 - 7/5/2025' },
  { title: 'Week 2', date: '8/5/2025 - 14/5/2025' },
  { title: 'Week 3', date: '15/5/2025 - 21/5/2025' },
  { title: 'Week 4', date: '22/5/2025 - 27/5/2025' },
];

const StudyPlan = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('in-class');

  return (
    <Main>
      <div className="container-study-plan">
        <WeekSelector
          weeks={weeks}
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

        {/* <WeekSelector
          weeks={weeks}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        /> */}
      </div>
    </Main>
  );
};

export default StudyPlan;
