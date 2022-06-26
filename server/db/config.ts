require('dotenv').config();
import pgPromise from 'pg-promise';

const options: pgPromise.IInitOptions = {
  query: (e: pgPromise.IEventContext) => {
    console.log(e.query);
  },
};

const pgp = pgPromise(options);

function setDatabase(): pgPromise.IDatabase<{}> {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) throw new Error('No database URL found');
    return pgp(process.env.DATABASE_URL);
  }
  return pgp({
    database: process.env.LOCAL_DATABASE_NAME,
    port: 5432,
    host: 'localhost',
  });
}

const db = setDatabase();

export default db;
