import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { StatusError } from '../../utils';
import User, { UserDataType } from '../User/User';

/**
 * Compares a user's plain text password with the hashed password in the database
 */
export const comparePass = (userPassword: string, databasePassword: string): boolean => {
  return bcrypt.compareSync(userPassword, databasePassword);
};

/**
 * Will tell you if a user is logged in.
 */
export const isUserAuthenticated = (req: any): boolean => {
  if (req.session.user) return true;
  return false;
};

/**
 * Given an Express request, will tell you if a logged-in user is an admin user.
 */
export const isUserAdmin = (req: any): boolean => {
  if (!req.session?.user) return false;
  const user = req.session.user
  if (!user.id) throw new Error('User should have an ID');
  if (user.is_admin) return true;
  return false;
};

/**
 * Given an Express request, and a User object, creates a session for that user.
 */
export const createSession = (req: Request, user: User): Promise<User> => {
  return new Promise((resolve, _reject) => {
    req.session.regenerate((err: Error) => {
      if (err) {
        throw new StatusError(500, 'Could not create session for new user', err);
      }
  
      // @ts-ignore
      req.session.user = user;
      req.session.save((err: Error) => {
        if (err) throw new StatusError(500, 'Could not save session', err);
        resolve(user);
      });
    });
  })

}

/**
 * Hashes the password for security in the database
 */
export const createPasswordDigest = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

