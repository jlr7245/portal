CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password_digest TEXT NOT NULL,
  email VARCHAR(255),
  dob VARCHAR(255),
  address TEXT,
  appointment_time VARCHAR(255),
  photo_url VARCHAR(255)
);