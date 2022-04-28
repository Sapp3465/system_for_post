const UNAUTHORIZED_REQUEST = 'Unauthorized request'

module.exports = (requiredStatus) => (req, res, next) => {
    if(!req.jwtParams) return res.status(401).send(UNAUTHORIZED_REQUEST);

    const { id, status } = req.jwtParams
    if (!id || !status) return res.status(401).send(UNAUTHORIZED_REQUEST);

    if(status !== requiredStatus) return res.status(403).send('You don\'t have access');

    next()
}