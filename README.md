# Requirements
- Node.js ^20.19.0 or >=22.12.0
- npm ^10.0.0

my versions:
- node v22.6.0
- npm v10.8.2

# How to run 
- create database
- in your database run sql script or perform import from `db_dump/vacation.sql`
- create `.env` file near `.env-example`, copy content from `.env-example`
- set correct variables in `.env` for the database connection
- `npm install`
- `cd src`
- `node main.js`

Node.js server will run on `localhost:3000`

# Project description
I used `express` for starting a server and `knex` for managing database. `main.js` contains settings, and starts a server.
- `controller/` contains controllers with `init()` method called in `main.js` to add routes handling 
- `constoller/validation` contains validation middleware helper
- `UserController` - handles user related routes
- `VacationRequestController` - hendles vacation requests related routes
