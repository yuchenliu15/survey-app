const assert = require('assert');
const {
    getPassword
} = require('../model/user').tests;

describe('query username from database', () => {
    it('return name', () => {
        getPassword('dffffffffff')
            .then(result => {
                assert.equal(result[0]['password'], '$2b$10$Jy4tJPZQxeHXM5KsxsCH6uN0u.dy1FpaPLZNfmwoCEi3kDHE/Kf.O');
            })
            .catch(e => console.log(e));
    });
});