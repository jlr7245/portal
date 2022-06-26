# Patient Portal

## Overview


### Requirements

- A patient should be able to register and log in.
  - Registration info required: name, date of birth, phone number, email, address, photo (driver license) and appointment time
- An administrator should be able to see a list of registered patients.

### Notes on Technology

The frontend of this app uses React and Apollo. The backend uses Node (Typescript) and GraphQL, with a PostgresQL database. Parcel is the bundler used.

Authentication is done with a super simple setup of `express-session` and `bcryptjs`. There are a lot of different ways to do auth; this one struck me as the most lightweight.

I considered using Go for the backend. However, Go is not a language I'm familiar with, while I have been building small Node services like this one for years. It would've been more time spent for a less polished effort, with fewer opinions on how a backend "should" work.

### Running the app locally

Tech required to run locally:
- Node 16 or later
- Postgres
- Yarn or NPM

1. Set up the database by running `yarn db:setup`. This creates a database named `jsilv_patientportal`.
2. Run `yarn makeenv`. This makes a `.env` file from `.env.template`. You'll fill in the values: whatever port you want to run the backend on, and a secret key (this can be just a string of gibberish. Keysmash away!).
3. You can run the app with the frontend decoupled from the backend, or with the backend serving the frontend. The functionality is the same.
    - For the former: Run `yarn start:portal`, and in a separate terminal window, `yarn start:server`. You'll be able to access the app at `http://localhost:1234`.
    - For the latter: Run `yarn start:production`. You'll be able to access the app at `http://localhost:3000`.
4. To seed the database, run `yarn db:seed`. This creates a number of users who have registered and have appointment times, and one user who is the admin. You can log in as the admin with the username / password pair `chewbacca` / `mlfalcon`.
5. Use the interface to your heart's content.
6. Clean up by running `yarn db:clean`. This will delete the patient portal database.


### Potential Improvements

(Starting this list early so I can avoid all the rabbit holes...)

- Pagination & lazy loading of the list of registrants
- Display available appointment times & keep track of filled ones
- Display appointment time requests in a calendar on the admin side
- Visually mark users who have registered since the admin last logged in
- Make a separate AdminUser class that holds methods like `dash` and `promoteUser`

## The Frontend



## The Backend


