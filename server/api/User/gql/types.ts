import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the service',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  })
});

export default [UserType];
