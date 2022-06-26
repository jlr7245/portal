import { gql, useMutation } from '@apollo/client';
import React from 'react';
import LoginForm from './LoginForm';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(
      username: $username
      password: $password
    ) {
      username
      first_name
      last_name
    }
  }
`

const LoginFormController = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  return (
    <LoginForm loginUser={loginUser} />
  )
}

export default LoginFormController;
