const bcrypt = require('bcrypt');
const knex = require('knex');
require('dotenv').config();

const devConnection = {
    host: process.env.PG_HOST_DEV,
    user: process.env.PG_USER_DEV,
    password: process.env.PG_PASSWORD_DEV,
    database: process.env.PG_DB_DEV
};

const prodConnection = {
    host: process.env.PG_HOST_PROD,
    user: process.env.PG_USER_PROD,
    password: process.env.PG_PASSWORD_PROD,
    database: process.env.PG_DB_PROD
};

const connection = process.env.NODE_ENV === 'development' ? devConnection : prodConnection;
const pg = knex({
    client: 'pg',
    connection: connection
});
console.log(connection)
console.log(process.env.NODE_ENV)
pg.schema.hasTable('users')
    .then(exists => {
        console.log(exists)
    });