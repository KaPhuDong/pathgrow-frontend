import React from 'react';
import StudentProfile from '../pages/student/student-profile/StudentProfile';
import Goals from '../pages/student/Goals';
import StudyPlan from '../pages/student/studyPlan/StudyPlan';

const routes = [
  {
    path: '/',
    element: <StudentProfile />
  },
  {
    path: '/student-goals', 
    element: <Goals />
  },
  {
    path: '/study-plan',
    element: <StudyPlan />
  },
];

export default routes;