import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import PostList from './components/PostList';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>GraphQL Posts</h1>
      <PostList />
    </div>
  </ApolloProvider>
);

export default App;
