const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config')

const UNAUTHORIZED_REQUEST = 'Unauthorized request'

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({message: UNAUTHORIZED_REQUEST});
    }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send({message: UNAUTHORIZED_REQUEST});
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        if (!payload) {
            return res.status(401).send({message: UNAUTHORIZED_REQUEST});
        }
        req.jwtParams = payload;

        next();
    } catch (err) {
        return res.status(401).send({message: UNAUTHORIZED_REQUEST});
    }
}