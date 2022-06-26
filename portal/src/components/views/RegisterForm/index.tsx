import { gql, useMutation } from '@apollo/client';
import React from 'react';
import RegisterForm from './RegisterForm';

const REGISTER_USER = gql`
  mutation CreateUser(
    $username: String!,
    $first_name: String!,
    $last_name: String!,
    $password: String!
  ) {
    createUser(
      username:$username,
      first_name:$first_name,
      last_name:$last_name,
      password:$password
    ) {
      username
      first_name
      last_name
    }
  }
`;

const RegisterFormController = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  return (
    <RegisterForm registerUser={registerUser} />
  );
}

export default RegisterFormController;
