const saveMessage = (req) => (type, content) => {
    type = type || 'info';
    const message = {
        type: type,
        content: content
    };
    const session = req.session;

    session.messages = session.messages || [];
    session.messages.push(message);
}

module.exports = (req, res, next) => {
    res.saveMessage = saveMessage(req);
    res.errorMessage = content => res.saveMessage('error', content);
    res.locals.removeMessages = () => {
        req.session.messages = [];
    }

    res.locals.messages = req.session.messages || [];
    next();
}