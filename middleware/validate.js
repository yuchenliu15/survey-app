function getField(req, field) {
    let body = req.body;
    console.log(body)
    field.forEach(prop => {
        body = body[prop];
    });
    return body;
}

function parseField(field) {
    const r = /\[|\]/;
    return field.split(r).filter(s => s);
}

function minLength(field, length) {
    field = parseField(field);
    return (req, res, next) => {
        if(getField(req, field).length > length) {
            next();
        }
        else {
            res.errorMessage(`${field[-1]} minimum of ${length} characters`);
            res.redirect('back');
        }

    }
}

module.exports = {
    getField,
    minLength
};