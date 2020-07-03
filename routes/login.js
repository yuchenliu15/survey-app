const express = require('express');
const router = express.Router();
const {
    minLength
} = require('../middleware/validate');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('authPage', { type: "login" });
});

router.post('/',
    minLength('user[name]', 5),
    minLength('user[pass', 6),
    submit
);

function submit(req, res, next) {
    console.log(req.body)
    res.render('authPage', { type: 'login' });
}

module.exports = router;
