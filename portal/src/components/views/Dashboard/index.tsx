import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import Dashboard from './Dashboard';

const DashboardController = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.isLoggedIn) navigate('/', { replace: true })
  return (
    <Dashboard />
  )
}

export default DashboardController;
