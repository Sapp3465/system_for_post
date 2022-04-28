module.exports = db => ({
    addExclusive: ({ userId, id }) => db.query(
        `INSERT INTO Exclusive (user_id, product_id, percent)
         VALUES ($1, $2, 5.5)`,
        [userId, id]
    ),

    deleteExclusiveById: (id) => db.query(
        `DELETE FROM Exclusive WHERE product_id = $1;`,
        [id]
    )
})