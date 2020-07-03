function getField(req, field) {
    let body = req.body;
    field = parseField(field);
    field.forEach(prop => {
        body = body[prop];
    });
    return body;
}

function parseField(field) {
    const r = /\[|\]/;
    return field.split(r).filter(s => s);
}

module.exports = {
    getField,
};