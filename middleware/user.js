const Users = require('../model/user');

module.exports = (req, res, next) => {
    const name = req.session.name;
    if(!name)
        return next();
        console.log('NAME' + name)
    Users.getUser(name)
        .then(user => {
            console.log(user);
            next();
        })
};
