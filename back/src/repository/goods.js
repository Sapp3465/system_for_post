module.exports = db => ({
    addGood: (unitId, orderId, quantity) => db.query(
        `INSERT INTO Goods (quantity, order_id, unit_id)
            VALUES ($2, $3, $1) RETURNING *;`,
        [unitId, quantity, orderId]
    ).then(data => data.rows),

    updateGood: ({ goodId, quantity, unitId }) => db.query(
        `UPDATE Goods
         SET quantity = $2,
             unit_id = $3
         WHERE id = $1 RETURNING *;`,
        [goodId, quantity, unitId]
    ).then(data => data.rows),
})