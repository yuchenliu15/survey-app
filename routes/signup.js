const express = require('express');
const router = express.Router();
const {
    minLength,
    match,
    required
} = require('../middleware/validate');
const Users = require('../model/user').Users;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('authPage', { type: "signup" });
});

router.post('/',
    required('user[name]'),
    required('user[password]'),
    minLength('user[name]', 5),
    minLength('user[password]', 6),
    match('user[password]', 'user[password2]'),
    submit
);

function submit(req, res, next) {
    const data = req.body.user;
    const users = new Users(data);

    users.getTable()
        .then(() => users.save())
        .then((res) => console.log(res))
        .catch(e => console.error(e));
}

module.exports = router;
