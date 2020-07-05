const assert = require('assert');
const {
    getPassword
} = require('../model/user').tests;

describe('query username from database', () => {
    it('return name', async () => {
        const password = await getPassword('dffffffffff');
        assert.equal(password, '$2b$10$Jy4tJPZQxeHXM5KsxsCH6uN0u.dy1FpaPLZNfmwoCEi3kDHE/Kf.O');

    });
});