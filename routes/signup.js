const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authPage', {type: "signup"});
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    res.render('authPage', {type: 'signup'});
});

module.exports = router;
