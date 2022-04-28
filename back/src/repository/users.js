module.exports = db => ({
    getByEmail: (email) => db.query(
        `SELECT * FROM Users WHERE email = $1;`, [email]
    ).then(data => data.rows),

    create: ({ email, status }) => db.query(
        `INSERT INTO Users (email, status) VALUES ($1, $2) RETURNING *;`,
        [ email, status ]
    ).then(data => data.rows),
})