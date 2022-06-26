CREATE DATABASE jsilv_patientportal;

\c jsilv_patientportal;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password_digest TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  dob VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  appointment_time VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL
);