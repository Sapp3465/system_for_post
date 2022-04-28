module.exports = db => ({
    addReplacements: ({ toId, id }) => db.query(
        `INSERT INTO Replacements (replace_to_id, product_id)
         VALUES ($1, $2)`,
        [toId, id]
    ),

    deleteReplacementsById: (id) => db.query(
        `DELETE FROM Replacements WHERE product_id = $1;`,
        [id]
    )
})