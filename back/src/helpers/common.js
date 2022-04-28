const productsRepo = require('../repository/products');
const unitsRepo = require('../repository/units');
const ordersRepo = require('../repository/orders')
const customerRepo = require('../repository/customers')

const send400 = (res, message) => res.status(400).send({ message });

const existNo = async (req) => {
    const [existingNo] = await customerRepo(req.db).getByNo(req.body.no);
    const [existingId] = await customerRepo(req.db).getById(req.body.id);
    if(!existingNo) return false;
    if(!existingId) return false;
    return existingNo.id !== existingId.id;
}

const getUnits = async (req) => {
    const codes = await productsRepo(req.db).getAllCode();
    const result = [];
    for(let i = 0; i < codes.length; i++){
        const code = codes[i].code;
        const rowUnits = await unitsRepo(req.db).getAllByCode(code);
        const units = rowUnits.map(obj => obj.unit)
        result.push({ code, units });
    }
    return result;
}

const formDataProducts = async (rowData, req) => {
    const data = []
    for (let i = 0; i < rowData.rowCount; i++) {
        const dataUnit = rowData.rows[i];
        const units = await unitsRepo(req.db).getAllById(dataUnit.id);
        dataUnit.units = units;
        data.push(dataUnit);
    }
    return data;
}

const getManyProducts = async (req) => {
    const { start, howMany } = req.params;
    const rowData = await productsRepo(req.db).getManyProducts(start, howMany)
    const size = await productsRepo(req.db).allProductsSize();
    const data = await formDataProducts(rowData, req);
    return { size, data }
}

const getManyProductsLike = async (req) => {
    const { start, howMany, template } = req.params;
    const rowData = await productsRepo(req.db).getManyProductsLike(template, start, howMany)
    const size = await productsRepo(req.db).likeProductsSize(template);
    const data = await formDataProducts(rowData, req);
    return { size, data }
}

const checkSortAvailabilityBody = req => {
    const { data, start, howMany } = req.body;
    return !data || !start.toString() || !howMany.toString();
}

const getSortedData = async (req) => {
    const { data, start, howMany, template } = req.body;
    const rowData = await productsRepo(req.db).sortedByAvailability(data, start, howMany, template);
    const size = await productsRepo(req.db).availabilityProductsSize(data, template);
    const endData = await formDataProducts(rowData, req);
    return { size, data: endData }
}

const changeOrderStatus = async (req) => {
    const { status, orderNo } = req.body;
    await ordersRepo(req.db).updateStatus(status, orderNo);
}

module.exports = {
    send400,
    existNo,
    getUnits,
    getManyProducts,
    getManyProductsLike,
    checkSortAvailabilityBody,
    getSortedData,
    changeOrderStatus
}