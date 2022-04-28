const router = require('express').Router();

const generator = require('../middlewares/generator')
const sendEmail = require('../middlewares/sendEmail')
const verifyToken = require('../middlewares/verifyToken')
const {
    checkSendLoginBody,
    existEmail,
    tokenSendLogin,
    sendSecretKey,
    checkSendRegistrationBody,
    tokenSendRegistration,
    checkSecretKeyBody,
    checkLoginTokenParams,
    checkTokenLife,
    checkSecretKey,
    loginToken,
    checkRegistrationTokenParams,
    createNewUser,
    registrationToken
} = require('../helpers/auth')
const {
    send400,
    existNo
} = require('../helpers/common')

router.post('/sendLogin', generator, sendEmail, async (req, res) => {
    if(!checkSendLoginBody(req)) return send400(res, 'Invalid data');

    const existing = await existEmail(req);
    if(!existing) return send400(res, 'This account doesn’t exist in the system');

    const token = tokenSendLogin(existing, req);
    await sendSecretKey(req);
    res.send({ token })
})

router.post('/sendRegistration', generator, sendEmail, async (req, res) => {
    if(checkSendRegistrationBody(req)) return send400(res, 'Invalid data');

    const existing = await existEmail(req);
    if(existing) return send400(res, 'This email is already exist');

    const existingNo = await existNo(req);
    if(existingNo) return send400(res, 'This No is already exist');

    const token = tokenSendRegistration(req);
    await sendSecretKey(req);
    res.send({ token })
})

router.post('/login', verifyToken, async (req, res) => {
    if(!checkSecretKeyBody(req)) return send400(res, 'Invalid data');

    if(checkLoginTokenParams(req)) return send400(res, 'Broken token');

    if(checkTokenLife(req)) return send400(res, 'Token is rotten, please login again');

    if(!checkSecretKey(req)) send400(res, 'Code is not valid');

    const token = loginToken(req);
    res.send({ token, status: req.jwtParams.status })
})

router.post('/register', verifyToken, async (req, res) => {
    if(!checkSecretKeyBody(req)) return send400(res, 'Invalid data');

    if(checkRegistrationTokenParams(req)) return send400(res, 'Broken token');

    if(checkTokenLife(req)) return send400(res, 'Token is rotten, please login again');

    if(!checkSecretKey(req)) send400(res, 'Code is not valid');

    const existingEmail = await existEmail(req);
    if(existingEmail) return send400(res, 'This email is already exist');

    const existingNo = await existNo(req);
    if(existingNo) return send400(res, 'This No is already exist');

    const newUser = await createNewUser(req);

    const token = registrationToken(newUser);
    res.send({ token, status: newUser.status })
})

module.exports = router