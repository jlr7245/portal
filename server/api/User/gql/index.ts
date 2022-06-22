import { GraphQLString } from 'graphql';
import { UserType } from './types';

export const query = {
  userData: {
    type: UserType,
    description: 'A User',
    resolve: (root: any, args: any, context: any) => {
      return { firstName: 'hello', lastName: 'world' };
    },
  },
};

export const mutation = {
  createUser: {
    type: UserType,
    description: 'Creates a new user',
    args: {
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
    },
    resolve: (root: any, args: any, context: any) => {
      return { firstName: 'hello', lastName: 'world' };
    },
  },
};

export { default as types } from './types';

