const express = require('express');
const router = express.Router();
const {
    minLength,
    match,
    required
} = require('../middleware/validate');

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
    console.log(req.body)
    res.render('authPage', { type: 'signup' });
}

module.exports = router;
