const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

import * as User from './api/User';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({ ...User.query /* could include other types here also */ }),
});
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({ ...User.mutation }),
});

export default new GraphQLSchema({
  query,
  mutation,
  types: [...User.types],
});
