module.exports = (err, req, res, next) => {
    console.log(err)
    if(err.statusCode >= 500)
    return res.status(500).send({ message : 'Server error' });
    next();
}