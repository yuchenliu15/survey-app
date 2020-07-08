const bcrypt = require('bcrypt');
const knex = require('knex');
const e = require('express');
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

class Users {

    constructor(data) {
        this.name = data.name;
        this.password = data.password;
    }

    hashPassword() {
        return bcrypt.genSalt()
            .then(salt => {
                this.salt = salt;
                return bcrypt.hash(this.password, this.salt);
            })
            .then(password => this.password = password)
            .catch(e => console.log(e));
    }

    static getUser(name) {
        return pg('users')
            .select()
            .where('name', name)
            .then(items => items[0]);
    }

    getTable() {
        return pg.schema.hasTable('users')
            .then(exists => {
                if (!exists) {
                    return pg.schema.createTable('users', table => {
                        table.text('name').primary();
                        table.text('password');
                        table.text('salt');
                        table.specificType('items', 'integer[]');
                    });
                }
            })
            .catch(e => console.log(e));
    }

    save() {
        return this.hashPassword()
            .then(() => {
                return pg('users').insert({
                    name: this.name,
                    password: this.password,
                    salt: this.salt,
                    items: []
                });
            });
    }

    async authenticate() {
        const user = await Users.getUser(this.name);
        const truePassword = user['password'];
        const salt = user['salt'];
        const enteredPassword = await bcrypt.hash(this.password, salt);

        return enteredPassword === truePassword;
    }
}


module.exports = Users;
