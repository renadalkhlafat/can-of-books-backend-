'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const domain =process.env.AUTH0_DOMAIN;

const client = jwksClient({
    jwksUri: `https://${domain}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

const authorizationHandler = (request, response) => {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, (err, user) => {
        if (err) {
            response.send('invalid token');
        }
        response.send(user)
    })
};

module.exports = authorizationHandler;