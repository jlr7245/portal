# Patient Portal

## Overview


### Requirements

- A patient should be able to register and log in.
  - Registration info required: name, date of birth, phone number, email, address, photo (driver license) and appointment time
- An administrator should be able to see a list of registered patients.

### Notes on Technology

The frontend of this app uses React and Apollo. The backend uses Node and GraphQL, with a PostgresQL database.

I considered using Go for the backend. However, Go is not a language I'm familiar with, while I have been building small Node services like this one for years. It would've been more time spent for a less polished effort.

### Running the app locally



### Potential Improvements

(Starting this list early so I can avoid all the rabbit holes...)

- Pagination & lazy loading of the list of registrants
- Display available appointment times & keep track of filled ones
- Display appointment time requests in a calendar on the admin side
- 

## The Frontend



## The Backend


