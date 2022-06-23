import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BASE_QUERY = gql`
  query UserData {
    userData {
      firstName
      lastName
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(BASE_QUERY);
  console.log(loading, error)
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  console.log(data);
  return (
    <div>
      <h1>Portal</h1>
      <div>{data.userData.firstName} {data.userData.lastName}</div>
    </div>
  );
};

export default App;
