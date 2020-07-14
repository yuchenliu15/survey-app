const Users = require('../model/user');

module.exports = (req, res, next) => {
    const name = req.session.name;
    if (!name)
        return next();

    Users.getUser(name)
        .then(user => {
            req.locals.user = user;
            next();
        });
};
