import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import RegisterForm from './RegisterForm';

const REGISTER_USER = gql`
  mutation CreateUser(
    $username: String!
    $first_name: String!
    $last_name: String!
    $password: String!
    $photo_url: String!
    $address: String!
  ) {
    createUser(
      username: $username
      first_name: $first_name
      last_name: $last_name
      password: $password
      photo_url: $photo_url
      address: $address
    ) {
      username
      first_name
      last_name
    }
  }
`;

// probably one should like, do server side rendering in order to
// avoid exposing the key, but that was one bridge too far for me!
const GET_GOOGLE_KEY = gql`
  query GoogleKey {
    googleKey
  }
`;

const RegisterFormController = ({ setAuth }: { setAuth: Function }) => {
  const [registerUser, { data: userData, loading: userLoading, error: userError }] =
    useMutation(REGISTER_USER);

  const {
    data: keyData,
    loading: keyLoading,
    error: keyError,
  } = useQuery(GET_GOOGLE_KEY);

  return (
    <div>
      {keyLoading ? (
        <h1>Loading...</h1>
      ) : (
        <RegisterForm
          registerUser={registerUser}
          googleKey={keyData?.googleKey}
          setAuth={setAuth}
        />
      )}
    </div>
  );
};

export default RegisterFormController;
