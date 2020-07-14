var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (res.locals.user) {
        res.redirect("/user");
    }
    else {
        res.render('home', { type: 'welcome' });

    }
});

module.exports = router;
