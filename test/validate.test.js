const assert = require('assert');
const {
    getField
} = require('../middleware/validate');
const { parse } = require('path');

describe('get field', () => {
    it('return the target field', () => {
        const body = {
            body: {
                test: {
                    task: 'value'
                }
            }
        };
        assert.equal(getField(body, 'test[task]'), 'value');
    })
})
