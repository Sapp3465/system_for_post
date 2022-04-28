const customerRepo = require('../repository/customers');
const productsRepo = require('../repository/products');
const unitsRepo = require('../repository/units');
const exsclusiveRepo = require('../repository/exsclusive');
const replacementsRepo = require('../repository/replacements');
const ordersRepo = require('../repository/orders')
const goodsRepo = require('../repository/goods')

const TWO_DAYS = 2 * 1000 * 60 * 60 * 24;

const getManyCustomers = async (req) => {
    const { start, howMany } = req.params;
    const rowData = await customerRepo(req.db).getMany(start, howMany);
    const size = await customerRepo(req.db).allCustomersSize();
    const data = rowData.rows.map(obj => ({ ...obj, deliveryDays: JSON.parse(obj.deliveryDays) }))
    return { size, data }
}

const checkEditCustomerBody = req => {
    const { id, no, deliveryDays } = req.body;
    return !id || !no || !deliveryDays;
}

const editCustomer = async (req) => {
    const { id, no, deliveryDays } = req.body;
    await customerRepo(req.db).updateCustomer({ id, no, deliveryDays: JSON.stringify(deliveryDays) })
}

const existId = async (req) => {
    const [existingId] = await customerRepo(req.db).getById(req.body.id);
    return existingId;
}

const getManyCustomersLike = async (req) => {
    const { start, howMany, template } = req.params;
    const rowData = await customerRepo(req.db).getManyLike(template, start, howMany);
    const size = await customerRepo(req.db).likeCustomersSize(template);
    const data = rowData.rows.map(obj => ({ ...obj, deliveryDays: JSON.parse(obj.deliveryDays) }))
    return { size, data }
}

const checkReplaceCatalogBody = req => {
    if (JSON.stringify(req.body) === '{}' ) return true;
    const { code, name, units, availability, exclusive, replacement } = req.body[0];
    return !code || !name || !units || !availability || !exclusive || !replacement;
}

const addAllUnits = async (units, db, id) => {
    for (let j = 0; j < units.length; j++){
        const { price, unit } = units[j];
        await unitsRepo(db).addUnit({ id, price, unit })
    }
}

const addAllExsclusive = async (exclusive, db, id, userId) => {
    for (let j = 0; j < exclusive.length; j++) {
        const [userIdRow] = await customerRepo(db).getUserIdByNo(exclusive[j]);
        if(userIdRow.id)
            await exsclusiveRepo(db).addExclusive({ id, userId: userIdRow.id })
    }
}

const addAllReplacement = async (replacement, db, id, toId) => {
    for (let j = 0; j < replacement.length; j++) {
        const [toIdRow] = await productsRepo(db).getIdByCode(replacement[j]);
        if(toIdRow.id)
            await replacementsRepo(db).addReplacements({ toId: toIdRow.id, id })
    }
}

const addToCatalog = async (req, element) => {
    const { db } = req;
    const productsDB = productsRepo(db);
    const { code, name, units, availability, exclusive, replacement } = element;
    const [idRow] = await productsDB.addProduct({ name, availability, code });
    await addAllUnits(units, db, idRow.id);
    await addAllExsclusive(exclusive, db, idRow.id);
    await addAllReplacement(replacement, db, idRow.id);
    return idRow.id;
}

const replaceCatalog = async (req) => {
    const { db } = req;
    const productsDB = productsRepo(db);
    await productsDB.deleteAll();
    for (let i = 0; i < req.body.length; i++){
        await addToCatalog(req, {...req.body[i], availability: Object.keys(req.body[i].availability)[0] });
    }
}

const checkAddProductBody = req => {
    const { code, name, units, availability, exclusive, replacement } = req.body;
    return !code || !name || !units || !availability || !exclusive || !replacement;
}

const deleteProduct = async (req) => {
    const { id } = req.params;
    await productsRepo(req.db).deleteById(id);
}

const getAllCustomersNo = async (req) => {
    const data = await customerRepo(req.db).getAllNo();
    return data.map(obj => obj.no);
}

const getAllProductsCode = async (req) => {
    const data = await productsRepo(req.db).getAllCode();
    return data.map(obj => obj.code);
}

const checkEditProductBody = req => {
    return checkAddProductBody(req) || !req.body.id
}

const checkExitCode = async (req) => {
    const [code] = await productsRepo(req.db).getIdByCode(req.body.code);
    if(!code) return false;
    return code.id !== req.body.id;
}

const checkExitCodeAdd = async (req) => {
    const [code] = await productsRepo(req.db).getIdByCode(req.body.code);
    return code;
}

const editProduct = async (req) => {
    const { db } = req;
    const { id, code, name, units, availability, exclusive, replacement } = req.body;
    await productsRepo(db).updateProduct({ id, code, availability, name });
    await unitsRepo(db).deleteUnitsById(id);
    await addAllUnits(units, db, id);
    await exsclusiveRepo(db).deleteExclusiveById(id);
    await addAllExsclusive(exclusive, db, id);
    await replacementsRepo(db).deleteReplacementsById(id);
    await addAllReplacement(replacement, db, id);
}

const getOrders = async (req) => {
    const ordersDb = ordersRepo(req.db);
    const ordersMainData = await ordersDb.getMainData();
    const result = [];
    for (let i = 0; i < ordersMainData.length; i++) {
        let { address, orderNo } = ordersMainData[i];
        if(!address)
            [{ address }] = await ordersDb.getCustomerAddressByOrderId(orderNo);
        const products = await ordersDb.getProducts(orderNo);
        result.push({ ...ordersMainData[i], address, products, items: products.length })
    }
    return result;
}

const checkChangeOrderStatus = async (req) => {
    const { status, orderNo } = req.body;
    if(!status || !orderNo) return 'Invalid data';
    if(status !== 'new' || status !== 'cancel' || status !== 'in progress' || status !== 'delivered')
        return 'Permission denied';
    const [currentStatus] = await ordersRepo(req.db).getStatusById(orderNo);
    if(status === 'cancel' && currentStatus.status !== 'new') return 'You can not cancel order if status not new'
}

const checkCreateOrderBody = req => {
    const { customerNo, products } = req.body;
    if(!customerNo || !products.length) return true;
}

const createOrder = async (req) => {
    const { customerNo, notes, reqDelivery, products, address } = req.body;
    const status = 'new';
    const ordered = new Date().getTime();
    let newReqDelivery = reqDelivery;
    if(!newReqDelivery) newReqDelivery = new Date().getTime() + TWO_DAYS;

    const [customer] = await customerRepo(req.db).getByNo(customerNo);

    const [newOrder] = await ordersRepo(req.db).createOrder({
        reqDelivery: newReqDelivery,
        status,
        address,
        customerId: customer.id,
        notes,
        ordered
    })

    const newProducts = [];
    for(let i = 0; i < products.length; i++) {
        const { code, unit, quantity } = products[i];
        const [productId] = await productsRepo(req.db).getIdByCode(code);
        const [unitId] = await unitsRepo(req.db).getIdByProductAndUnit(productId.id, unit);
        const [good] = await goodsRepo(req.db).addGood(unitId.id, newOrder.id, quantity);
        newProducts.push({ goodId: good, code, unit, quantity, name: productId.name })
    }
    let newAddress = address;
    if(!newAddress)
        [{ newAddress }] = await ordersRepo(req.db).getCustomerAddressByOrderId(newOrder.id);

    return {
        orderNo: newOrder.id,
        customer: customer.name,
        customerNo, notes, ordered,
        status, address: newAddress,
        reqDelivery: newReqDelivery,
        products: newProducts, items: newProducts.length }

}

module.exports = {
    getManyCustomers,
    checkEditCustomerBody,
    existId,
    editCustomer,
    getManyCustomersLike,
    addToCatalog,
    replaceCatalog,
    checkReplaceCatalogBody,
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
}