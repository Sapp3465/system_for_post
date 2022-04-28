const jwt = require('jsonwebtoken');

const usersRepo = require('../repository/users');
const customerRepo = require('../repository/customers');
const { SECRET_KEY } = require('../config');
const { existNo } = require('./common');

const FRESH_TOKEN_TIME = 1000 * 60 * 15;
const URL_BASE = 'http://localhost:4200/digitsView/';

const checkSendLoginBody = req => {
    const { email } = req.body;
    return !!email
}

const existEmail = async req => {
    const [existEmail] = await usersRepo(req.db).getByEmail(req.body.email);
    return existEmail;
}

const tokenSendLogin = (existing, req) => {
    const payload = {
        id : existing.id,
        status : existing.status,
        tokenSecretKey : req.generatedKey,
        sendingTime : new Date().getTime()
    };
    return jwt.sign(payload, SECRET_KEY);
}

const sendSecretKey = async (req) => {
    const url = URL_BASE + req.generatedKey;

    await req.sendEmail({
        to : req.body.email,
        subject : 'Secret code for bravo',
        text : 'Secret key:',
        html : `<h2>Your secret key : ${url}</h2>`,
    });
}

const checkSendRegistrationBody = req => {
    const { email, name, address, contactName, days, no } = req.body;
    return !email || !name || !address || !contactName || !days || !no;
}

const tokenSendRegistration = req => {
    const { email, name, address, contactName, days, no, mobilePhone } = req.body;
    const payload = {
        email, name, address, contactName, days, mobilePhone, no,
        tokenSecretKey : req.generatedKey,
        sendingTime : new Date().getTime()
    };
    return jwt.sign(payload, SECRET_KEY);
}

const checkSecretKeyBody = req => {
    const { secretKey } = req.body;
    return !!secretKey;
}

const checkLoginTokenParams = req => {
    const { id, status, tokenSecretKey, sendingTime } = req.jwtParams;
    return !id || !status || !tokenSecretKey || !sendingTime;
}

const checkTokenLife = req => {
    return new Date().getTime() - req.jwtParams.sendingTime > FRESH_TOKEN_TIME;
}

const checkSecretKey = req => {
    return req.jwtParams.tokenSecretKey === req.body.secretKey
}

const loginToken = req => {
    const { id, status } = req.jwtParams;
    const payload = {
        id, status
    };
    console.log(payload)
    return jwt.sign(payload, SECRET_KEY);
}

const checkRegistrationTokenParams = req => {
    const { email, name, address, contactName, days , tokenSecretKey, sendingTime, no } = req.jwtParams;
    return !email || !name || !tokenSecretKey || !sendingTime || !address || !contactName || !days || !no;
}

const createNewUser = async (req) => {
    const { email, mobilePhone, name, address, contactName, days , no } = req.jwtParams
    const [newUser] = await usersRepo(req.db).create({ email, status: 'customer' })

    await customerRepo(req.db).create({
        no, name, address, contactName, deliveryDays: JSON.stringify(days), mobilePhone, userId : newUser.id
    })

    return newUser;
}

const registrationToken = newUser => {
    const payload = {
        id : newUser.id, status: newUser.status
    };
    return jwt.sign(payload, SECRET_KEY);
}

module.exports =
    {
        checkSendLoginBody,
        existEmail,
        tokenSendLogin,
        sendSecretKey,
        checkSendRegistrationBody,
        existNo,
        tokenSendRegistration,
        checkSecretKeyBody,
        checkLoginTokenParams,
        checkTokenLife,
        checkSecretKey,
        loginToken,
        checkRegistrationTokenParams,
        createNewUser,
        registrationToken
    };