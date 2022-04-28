module.exports = db => ({
    create: ({no, name, address, contactName, deliveryDays, mobilePhone, userId}) => db.query(
        `INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [no, name, address, contactName, deliveryDays, mobilePhone, userId]
    ).then(data => data.rows),

    getByNo: (no) => db.query(
        `SELECT * FROM Customers WHERE no = $1;`,
        [no]
    ).then(data => data.rows),

    getUserIdByNo: (no) => db.query(
        `SELECT user_id AS "id" FROM Customers WHERE no = $1;`,
        [no]
    ).then(data => data.rows),

    getById: (id) => db.query(
        `SELECT * FROM Customers WHERE id = $1;`,
        [id]
    ).then(data => data.rows),

    getMany: (start, howMany) => db.query(
        `SELECT id, no, name, address, delivery_days AS "deliveryDays" 
            FROM Customers LIMIT $2 OFFSET $1;`,
        [start, howMany]
    ),

    updateCustomer: ({ id, no, deliveryDays }) => db.query(
        `UPDATE Customers SET no = $2, delivery_days = $3 WHERE id = $1;`,
        [id, no, deliveryDays]
    ),

    getManyLike: (template, start, howMany) => db.query(
        `SELECT id, no, name, address, delivery_days AS "deliveryDays"
        FROM Customers 
        where no ~* '${template}' 
        OR name ~* '${template}'
        OR address ~* '${template}'
        OR contact_name ~* '${template}' 
        LIMIT $2 OFFSET $1; `,
        [start, howMany]
    ),

    getAllNo: () => db.query(
        `SELECT no FROM Customers;`
    ).then(data => data.rows),

    allCustomersSize: () => db.query(
        `SELECT COUNT(id) FROM Customers;`
    ).then(data => data.rows[0].count),

    likeCustomersSize: (template) => db.query(
        `SELECT COUNT(id)
        FROM Customers 
        where no ~* '${template}' 
        OR name ~* '${template}'
        OR address ~* '${template}'
        OR contact_name ~* '${template}';`
    ).then(data => data.rows[0].count),

    getByUserId: (userId) => db.query(
        `SELECT Customers.no FROM Users
        INNER JOIN Customers ON Customers.user_id = Users.id
        WHERE Users.id = $1;`,
        [userId]
    ).then(data => data.rows),
})