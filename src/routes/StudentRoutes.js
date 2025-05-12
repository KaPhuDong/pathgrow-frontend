import React from 'react';
import StudentProfile from '../pages/student/StudentProfile';
import Goals from '../pages/student/Goals';
import StudyPlan from '../pages/student/StudyPlan';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';

const routes = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/student/profile',
    element: <StudentProfile />,
  },
  {
    path: '/student/goals',
    element: <Goals />,
  },
  {
    path: '/study/plans',
    element: <StudyPlan />,
  },
];

export default routes;
