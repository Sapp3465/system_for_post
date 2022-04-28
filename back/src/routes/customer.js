const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')
const {
    send400,
    changeOrderStatus
} = require('../helpers/common')
const {
    createOrder
} = require('../helpers/admin')
const {
    getOrders,
    checkChangeOrderStatus,
    checkCreateOrderBody,
    fillBody,
    checkEditOrderBody,
    editOrder
} = require('../helpers/customer')

router.use(verifyToken)
router.use(checkUserStatus('customer'))

router.get('/getOrders', async (req, res) => {
    const data = await getOrders(req);
    res.send(data);
})

router.put('/changeOrderStatus', async (req, res) => {
    const error = await checkChangeOrderStatus(req);
    if(error) return send400(res, error);

    await changeOrderStatus(req);
    res.send({ message: 'ok' });
})

router.post('/createOrder', async (req, res) => {
    if(checkCreateOrderBody(req)) send400(res, 'Invalid data');
    await fillBody(req);
    const data = await createOrder(req);

    res.send(data);
})

router.put('/editOrder', async (req, res) => {
    if(checkEditOrderBody(req)) send400(res, 'Invalid data');
    await editOrder(req);

    res.send({ message: 'ok' });
})

module.exports = router