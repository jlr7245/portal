import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const LOGOUT_QUERY = gql`
  query Logout {
    logout
  }
`;

type LoggerOuterProps = {
  setAuth: Function;
};

const LoggerOuter = ({ setAuth }: LoggerOuterProps) => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(LOGOUT_QUERY);
  if (data?.logout === true) {
    setAuth({ loggedIn: false, user: {} });
    navigate('/');
  }
  return <>{loading && <span>Logging out...</span>}</>;
};

export default LoggerOuter;
