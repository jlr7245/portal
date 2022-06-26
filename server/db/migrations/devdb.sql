CREATE DATABASE jsilv_patientportal;

\c jsilv_patientportal;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password_digest TEXT,
  email VARCHAR(255),
  dob VARCHAR(255),
  address TEXT,
  appointment_time VARCHAR(255),
  photo_url VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE
);
