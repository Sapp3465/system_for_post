const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken')
const checkUserStatus = require('../middlewares/checkUserStatus')
const {
    getManyCustomers,
    checkEditCustomerBody,
    existId,
    editCustomer,
    getManyCustomersLike,
    checkReplaceCatalogBody,
    addToCatalog,
    replaceCatalog,
    checkAddProductBody,
    deleteProduct,
    getAllCustomersNo,
    getAllProductsCode,
    checkEditProductBody,
    editProduct,
    checkExitCode,
    checkExitCodeAdd,
    getOrders,
    checkChangeOrderStatus,
    checkCreateOrderBody,
    createOrder
} = require('../helpers/admin');
const {
    send400,
    existNo,
    changeOrderStatus
} = require('../helpers/common')


router.use(verifyToken)
router.use(checkUserStatus('admin'))

router.get('/getCustomers/:start/:howMany', async (req, res) => {
    const data = await getManyCustomers(req)
    res.send(data)
})

router.put('/editCustomer', async (req, res) => {
    if(checkEditCustomerBody(req)) return send400(res, 'Invalid data');

    const existingId = await existId(req);
    if(!existingId) return send400(res, 'Invalid data');

    const existingNo = await existNo(req);
    if(existingNo) return send400(res, 'This no is already exist');

    await editCustomer(req);
    res.send({ message: 'ok' })
})

router.get('/getCustomersLike/:template/:start/:howMany', async (req, res) => {
    const data = await getManyCustomersLike(req)
    res.send(data)
})

router.post('/replaceCatalog', async (req, res) => {
    if(checkReplaceCatalogBody(req)) return send400(res, 'Invalid data');
    await replaceCatalog(req);
    res.send({ message: 'ok' })
})

router.post('/addProduct', async (req, res) => {
    if(checkAddProductBody(req)) return send400(res, 'Invalid data');
    const code = await checkExitCodeAdd(req);
    if(code) return send400(res, 'This code is already exist');
    const id = await addToCatalog(req, req.body);
    res.send({ id })
})

router.delete('/deleteProduct/:id', async (req, res) => {
    await deleteProduct(req);
    res.send({ message: 'ok' });
})

router.get('/allCustomersNo', async (req, res) => {
    const data = await getAllCustomersNo(req);
    res.send(data);
})

router.get('/allProductsCode', async (req, res) => {
    const data = await getAllProductsCode(req);
    res.send(data);
})

router.put('/editProduct', async (req, res) => {
    if(checkEditProductBody(req)) return send400(res, 'Invalid data');
    const code = await checkExitCode(req);
    if(code) return send400(res, 'This code is already exist');
    await editProduct(req);
    res.send({ message: 'ok' })
})

router.get('/getOrders', async (req, res) => {
    const data = await getOrders(req);
    res.send(data);
})

router.put('/changeOrderStatus', async (req, res) => {
    const error = await checkChangeOrderStatus(req);
    if(error) send400(res, error);

    await changeOrderStatus(req);
    res.send({ message: 'ok' })
})

router.post('/createOrder', async (req, res) => {
    if(checkCreateOrderBody(req)) return send400(res, 'Invalid data');

    const data = await createOrder(req);
    res.send(data)
})


module.exports = router