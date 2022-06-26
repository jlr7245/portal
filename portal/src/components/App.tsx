import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm, RegisterForm } from './views';

const App = () => {
  return (
    <>
      <div>
        <h1>Portal</h1>
      </div>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default App;
