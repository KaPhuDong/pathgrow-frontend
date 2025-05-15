import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../api/auth/service';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout();
    navigate('/');
  }, [navigate]);

  return null;
}

export default Logout;
