const router = require('express').Router();

router.get('/', (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
        console.log('logout successfully');
        res.redirect('/');
    });
});

module.exports = router;