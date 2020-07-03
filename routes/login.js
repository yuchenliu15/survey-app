var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authPage', {type: "login"});
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    res.render('authPage', {type: 'login'});
})

module.exports = router;
