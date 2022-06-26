import { gql, useMutation } from '@apollo/client';
import React from 'react';
import LoginForm from './LoginForm';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      username
      first_name
      last_name
    }
  }
`

const LoginFormController = ({ setAuth }: { setAuth: Function }) => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  return (
    <LoginForm setAuth={setAuth} login={login} />
  )
}

export default LoginFormController;
