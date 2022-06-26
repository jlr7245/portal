import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Dashboard, LoginForm, RegisterForm } from './views';
import { Container, Footer } from './layout';
import { Logout } from './datalayer';

export const AuthContext = React.createContext({
  auth: {
    isLoggedIn: false,
    user: {},
  },
  setAuth: Function,
});

const HANDSHAKE_QUERY = gql`
  query Handshake {
    handshake {
      first_name
      last_name
      username
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(HANDSHAKE_QUERY);
  const [auth, setAuth] = useState({
    auth:
      loading || !data?.handshake
        ? { isLoggedIn: false, user: {} }
        : { isLoggedIn: true, user: data.handshake },
  });

  if (loading) return <h1>Loading...</h1>;

  return (
    <Container className="fullscreen">
      <AuthContext.Provider
        value={{
          //@ts-ignore
          auth,
          //@ts-ignore
          setAuth,
        }}
      >
        <Container className="mostscreen">
          <div>
            <h1>Portal</h1>
          </div>
          <Routes>
            <Route path="/" element={<RegisterForm setAuth={setAuth} />} />
            <Route path="login" element={<LoginForm setAuth={setAuth} />} />
            <Route path="dash" element={<Dashboard />} />
            <Route path="logout" element={<Logout setAuth={setAuth} />} />
          </Routes>
        </Container>
        <Footer />
      </AuthContext.Provider>
    </Container>
  );
};

export default App;
