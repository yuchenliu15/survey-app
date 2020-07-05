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

const hashPassword = password => {
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(password, salt);
        })
        .catch(e => console.log(e));
}

const getPassword = user => {
    return pg('users')
            .select('password')
            .where('name', user);
}

module.exports.Users = {
    getTable() {
        return pg.schema.hasTable('users')
        .then(exists => {
            if(!exists) {
                return pg.schema.createTable('users', table => {
                    table.text('name').primary();
                    table.text('password');
                    table.specificType('items', 'integer[]');
                });
            }
        })
        .catch(e => console.log(e));
    },
    save(data) {
        return hashPassword(data.password)
            .then(password => {
                return pg('users').insert({
                    name: data.name,
                    password: password,
                    items: []
                });
            });
    },
    authenticate(data) {
        return hashPassword(data.password)
        .then(password => {
            return 
        })
    }

}

module.exports.tests = {
    getPassword
};