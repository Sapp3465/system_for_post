module.exports = db => ({
    addUnit: ({ unit, price, id }) => db.query(
        `INSERT INTO Units (unit, price, product_id)
         VALUES ($1, $2, $3)`,
        [unit, price, id]
    ),

    getAllById: (id) => db.query(
        `SELECT unit, price FROM Units WHERE product_id = $1`,
        [id]
    ).then(data => data.rows),

    deleteUnitsById: (id) => db.query(
        `DELETE FROM Units WHERE product_id = $1;`,
        [id]
    ),
    getAllByCode: (code) => db.query(
        `SELECT Units.unit FROM Products
INNER JOIN Units ON Products.id = Units.product_id
WHERE Products.code = $1;`,
        [code]
    ).then(data => data.rows),

    getIdByProductAndUnit: (productId, unit) => db.query(
        `SELECT * FROM Units WHERE product_id = $1 AND unit = $2;`,
        [productId, unit]
    ).then(data => data.rows),
})