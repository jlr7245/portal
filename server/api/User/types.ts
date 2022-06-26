import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the service',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    dob: { type: GraphQLString },
    address: { type: GraphQLString },
    appointment_time: { type: GraphQLString },
    photo_url: { type: GraphQLString },
  }),
});


export const UserDashType = new GraphQLObjectType({
  name: 'Dashboard',
  description: 'User dashboard information',
  fields: () => ({
    currentUser: { type: UserType },
    allUsers: { type: new GraphQLList(UserType) },
  })
})

export default [UserType, UserDashType];
