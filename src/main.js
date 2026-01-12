import UserController from './controller/user.js';
import VacationRequest from './controller/vacation_request.js';

import knex from 'knex';
import express from 'express';
import validator from 'express-validator';

import { loadEnvFile } from 'node:process';
loadEnvFile('../.env');

global.knex = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.validator = validator;
global.app = app;

const user = new UserController().init();
const vacationRequest = new VacationRequest().init();

app.listen(port, () => console.log('Server started...'));
