import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
//@ts-ignore
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: '/graphql',
  }),
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);
