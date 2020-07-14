const express = require('express');
const router = express.Router();
const {
    required
} = require('../middleware/validate');
const Users = require('../model/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('authPage', { type: "login" });
});

router.post('/',
    required('user[name]'),
    required('user[password]'),
    submit
);

async function submit(req, res, next) {
    const data = req.body.user;
    console.log(data)
    const users = new Users(data);
    const auth = await users.authenticate();
    if (!!auth) {
        req.session.name = users.name;
        res.redirect('/');
    }
    else {
        res.errorMessage('wrong username or password');
        res.redirect('back');
    }
}

module.exports = router;
