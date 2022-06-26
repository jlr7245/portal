const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

import { User, BaseData } from './api';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({ ...User.query, ...BaseData.query }),
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
