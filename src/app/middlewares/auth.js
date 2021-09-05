const jwt = require('jsonwebtoken');
const status = require('http-status');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(status.UNAUTHORIZED).send({ error: 'No token provided.' });
    }

    const parts = authHeader.split(' ');
    if (!parts.length == 2) {
        return res.status(status.UNAUTHORIZED).send({ error: 'Token error.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/.test(scheme)) {
        return res.status(status.UNAUTHORIZED).send({error: 'Token malformatted.'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(status.UNAUTHORIZED).send({error: 'Invalid token.'});
        }

        req.userId = decoded.id;
        return next();
    });
};