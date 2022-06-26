import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import RegisterForm from './RegisterForm';

const REGISTER_USER = gql`
  mutation CreateUser(
    $username: String!
    $first_name: String!
    $last_name: String!
    $password: String!
  ) {
    createUser(
      username: $username
      first_name: $first_name
      last_name: $last_name
      password: $password
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

const RegisterFormController = () => {
  const [registerUser, { data: userData, loading: userLoading, error: userError }] =
    useMutation(REGISTER_USER);
    
  const {
    data: keyData,
    loading: keyLoading,
    error: keyError,
  } = useQuery(GET_GOOGLE_KEY);

  /**
   * 1. Don't show anything until we get the google key back;
   * 2. When we get the key, show the form;
   * 3. When the registerUser is completed successfully, display a Redirect component (or use a useNavigate hook? hmm)
   */

  console.log(keyData, keyLoading, keyError);
  return (
    <div>
      {keyLoading ? (
        <h1>Loading...</h1>
      ) : (
        <RegisterForm registerUser={registerUser} googleKey={keyData.googleKey} />
      )}
    </div>
  );
};

export default RegisterFormController;
