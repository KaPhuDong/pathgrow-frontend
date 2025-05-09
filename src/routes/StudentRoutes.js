import React from 'react';
import StudentProfile from '../pages/student/student-profile/StudentProfile';
import Goals from '../pages/student/Goals';
import StudyPlan from '../pages/student/studyPlan/StudyPlan';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/student-profile',
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