const ordersRepo = require('../repository/orders')
const customersRepo = require('../repository/customers')
const productsRepo = require('../repository/products')
const unitsRepo = require('../repository/units')
const goodsRepo = require('../repository/goods')

const getOrders = async (req) => {
    const { id } = req.jwtParams;
    const ordersDb = ordersRepo(req.db);
    const orders = await ordersDb.getCustomerData(id);
    const result = [];
    for(let i = 0; i < orders.length; i++){
        let { address, orderNo } = orders[i];
        const products = await ordersDb.getProducts(orderNo);
        if(!address)
            [{ address }] = await ordersDb.getCustomerAddressByOrderId(orderNo);
        result.push({ ...orders[i], products, address, items: products.length })
    }
    return result
}

const checkChangeOrderStatus = async (req) => {
    const { status, orderNo } = req.body;
    const { id } = req.jwtParams;
    if(status !== 'new' || status !== 'cancel' || status !== 'completed') return 'Permission denied';
    const [isUserOrder] = await ordersRepo(req.db).checkUserOrder(id, orderNo);
    if(!isUserOrder) return 'This is not your order';
    if(!status || !orderNo) return 'Invalid data';
    const [currentStatus] = await ordersRepo(req.db).getStatusById(orderNo);
    if(status === 'cancel' && currentStatus.status !== 'new') return 'You can not cancel order if status not new'
}

const checkCreateOrderBody = req => {
    const { products } = req.body;
    if(!products.length) return true;
}

const fillBody = async (req) => {
    const { id } = req.jwtParams;
    const [customer] = await customersRepo(req.db).getByUserId(id);
    req.body.customerNo = customer.no;
}

const checkEditOrderBody = req => {
    const { products, orderNo } = req.body;
    if(!products.length || !orderNo) return true;
}

const editOrder = async (req) => {
    const { notes, products, address, orderNo } = req.body;
    await ordersRepo(req.db).updateOrder({ address, notes, orderId: orderNo });

    for(let i = 0; i < products.length; i++){
        const { code, unit, quantity, goodId } = products[i];
        const [productId] = await productsRepo(req.db).getIdByCode(code);
        const [unitId] = await unitsRepo(req.db).getIdByProductAndUnit(productId.id, unit);
        await goodsRepo(req.db).updateGood({ unitId: unitId.id, quantity, goodId });
    }
}

module.exports = {
    getOrders,
    checkChangeOrderStatus,
    checkCreateOrderBody,
    fillBody,
    checkEditOrderBody,
    editOrder
}