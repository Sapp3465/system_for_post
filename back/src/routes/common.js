const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const {
    send400,
    getUnits,
    getManyProducts,
    getManyProductsLike,
    checkSortAvailabilityBody,
    getSortedData,
} = require('../helpers/common')

router.use(verifyToken)

router.get('/getProducts/:start/:howMany', async (req, res) => {
    const data = await getManyProducts(req);
    res.send(data);
})

router.get('/getProductsLike/:template/:start/:howMany', async (req, res) => {
    const data = await getManyProductsLike(req);
    res.send(data);
})

router.post('/sortAvailability', async (req, res) => {
    if(checkSortAvailabilityBody(req)) return send400(res, 'Invalid data');

    const data = await getSortedData(req);
    res.send(data)
})

router.get('/getUnits', async (req, res) => {
    const data = await getUnits(req);
    res.send(data);
})

module.exports = router