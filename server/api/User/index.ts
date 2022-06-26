import { GraphQLBoolean, GraphQLList, GraphQLString } from 'graphql';
import { Request } from 'express';

import User from './User';
import { UserDashType, UserType } from './types';
import {
  comparePass,
  createPasswordDigest,
  createSession,
  isUserAdmin,
  isUserAuthenticated,
} from '../utils/auth';
import { StatusError } from '../../utils';

export const query = {
  userList: {
    type: new GraphQLList(UserType),
    description: 'List of all users',
    resolve: async (root: any, args: null, req: Request) => {
      if (isUserAdmin(req)) {
        return await User.findAll();
      }
      throw new StatusError(403, 'Must be logged in');
    },
  },
  user: {
    type: UserType,
    description: 'One particular user',
    args: {
      id: { type: GraphQLString },
    },
    resolve: async (root: any, args: { id: number }, req: Request) => {
      if (!isUserAuthenticated(req))
        throw new StatusError(403, 'Must be logged in to see this');
      try {
        return await User.findById(args.id);
      } catch (err) {
        if (err instanceof Error) throw new StatusError(500, 'Could not find user', err);
        throw err;
      }
    },
  },
  dash: {
    type: UserDashType,
    description: 'Dashboard for the current user',
    resolve: async (root: any, args: {}, req: Request) => {
      if (!isUserAuthenticated(req))
        throw new StatusError(403, 'Must be logged in to see this');
      try {
        // @ts-ignore
        const user: User = req.session.user;
        const allUsers = user.is_admin ? await User.findAll() : [];
        return {
          currentUser: user,
          allUsers,
        };
      } catch (err) {
        if (err instanceof Error)
          throw new StatusError(500, 'Could not display dash', err);
        throw err;
      }
    },
  },
  logout: {
    type: GraphQLBoolean,
    description: 'Logs a user out',
    resolve: async (_root: any, _args: {}, req: Request) => {
      //@ts-ignore
      req.session.user = null;
      return await new Promise((resolve, _reject) => {
        req.session.save((err: Error) => {
          if (err) throw new StatusError(500, 'Could not log out', err);
          req.session.regenerate((err: Error) => {
            if (err)
              throw new StatusError(
                500,
                'Could not creat new session after logging out',
                err,
              );
            resolve(true);
          });
        });
      });
    },
  },
};

export const mutation = {
  createUser: {
    type: UserType,
    description: 'Creates a new user',
    args: {
      username: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (
      _root: any,
      args: { username: string; first_name: string; last_name: string; password: string },
      req: Request,
    ) => {
      try {
        // we are not saving unencrypted passwords...
        const password_digest = createPasswordDigest(args.password);
        const user = await new User({ password_digest, ...args }).save();

        // also have to log them in
        return await createSession(req, user);
      } catch (err: any) {
        if (err instanceof StatusError) throw err;
        if (err instanceof Error) {
          throw new StatusError(500, 'Could not create user', err);
        }
      }
    },
  },
  login: {
    type: UserType,
    description: 'Logs a user in',
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (
      _root: any,
      args: { username: string; password: string },
      req: Request,
    ) => {
      try {
        // find user
        const user = await User.findByUsername(args.username);

        // if no user, or if user is a test without a password, throw error
        if (!user) throw new StatusError(403, 'No user found by that username');
        if (!user.password_digest)
          throw new StatusError(403, 'User found but cannot be authenticated');

        // if the passwords match, let them in
        if (comparePass(args.password, user.password_digest)) {
          return await createSession(req, user);
        }

        // otherwise, throw error
        throw new StatusError(403, 'Incorrect password, please try again');
      } catch (err) {
        if (err instanceof StatusError) throw err;
        if (err instanceof Error) throw new StatusError(500, 'Could not log in', err);
      }
    },
  },
};

export { default as types } from './types';
