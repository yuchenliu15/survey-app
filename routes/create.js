const express = require('express');
const router = express.Router();
const session = require('express-session');

router.post('/step1',
    required('survey[number]'),
    submit
);

async function submit(req, res, next) {
    session.number = req.body.survey.number;
    res.redirect('/step2');
}

module.exports = router;
