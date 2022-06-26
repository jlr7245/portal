import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { RegisterForm } from './views';

const App = () => {
  return (
    <>
      <div>
        <h1>Portal</h1>
      </div>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </>
  );
};

export default App;
