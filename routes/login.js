const express = require('express');
const router = express.Router();
const {
    required
} = require('../middleware/validate');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('authPage', { type: "login" });
});

router.post('/',
    required('user[name]'),
    required('user[password]'),
    submit
);

function submit(req, res, next) {
    console.log(req.body)
    res.render('authPage', { type: 'login' });
}

module.exports = router;
