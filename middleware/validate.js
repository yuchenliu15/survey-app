function getField(req, field) {
    let body = req.body;
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
        if(getField(req, field).length >= length) {
            next();
        }
        else {
            res.errorMessage(`${field[field.length - 1]} minimum of ${length} characters`);
            res.redirect('back');
        }

    }
}

function match(firstField, secondField) {
    const first = parseField(firstField);
    const second = parseField(secondField);

    return (req, res, next) => {
        if(getField(req, first) === getField(req, second)) {
            next();
        }
        else {
            res.errorMessage(`${first[first.length - 1]} not matched`);
            res.redirect('back');
        }
    };
}

function required(field) {
    field = parseField(field);
    return (req, res, next) => {
        if(getField(req, field).length > 0) {
            next();
        }
        else {
            res.errorMessage(`${field[field.length - 1]} is required`);
            res.redirect('back');
        }

    };
}

module.exports = {
    getField,
    minLength,
    match,
    required
};