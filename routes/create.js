const express = require('express');
const router = express.Router();
const session = require('express-session');
const {
    required
} = require('../middleware/validate');


router.get('/', (req, res) => {

    res.render('createSurvey', 
        { 
            type: "create a survey"
        });
});

router.post('/',
    required('survey[number]'),
    submit
);

async function submit(req, res, next) {
    session.number = req.body.survey.number;
    
}

module.exports = router;
