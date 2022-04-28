module.exports = (req, res, next) => {
    const SECRET_LENGTH = 6,
        DIGIT = '0123456789'

    let key = '';
    for (let i = 0; i < SECRET_LENGTH; i++) {
        const index = Math.floor(Math.random() * DIGIT.length);
        key += index;
    }
    req.generatedKey = key;
    next();
}