import db from '../../db/config';
import modelDefaults from '../utils/modelDefaults';

type UserType = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password_digest: string;
  email: string;
  dob: string;
  address: string;
  appointment_time: string;
  photo_url: string;
};

const defaults = modelDefaults<UserType>('users');

class User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password_digest: string;
  email: string;
  dob: string;
  address: string;
  appointment_time: string;
  photo_url: string;

  constructor({
    id,
    username,
    first_name,
    last_name,
    password_digest,
    email,
    dob,
    address,
    appointment_time,
    photo_url,
  }: UserType) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password_digest = password_digest;
    this.email = email;
    this.dob = dob;
    this.address = address;
    this.appointment_time = appointment_time;
    this.photo_url = photo_url;
  }

  static findAll = defaults.findAll;
  static findById = defaults.findById;
  static destroy = defaults.destroy;

  private modify(changes: UserType): User {
    Object.assign(this, changes);
    return this;
  }

  async save(): Promise<User> {
    const user: UserType = await db.one(
      `
      INSERT INTO users (
        username, first_name, last_name, password_digest, email, dob, address, appointment_time, photo_url
      ) VALUES (
        $/username/, $/first_name/, $/last_name/, $/password_digest/, $/email/, $/dob/, $/address/, $/appointment_time/, $/photo_url/
      ) RETURNING *
    `,
      this,
    );
    return this.modify(user);
  }
}

export default User;
