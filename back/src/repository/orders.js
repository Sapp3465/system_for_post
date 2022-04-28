module.exports = db => ({
    getMainData: () => db.query(
        `SELECT 
        Orders.id AS "orderNo", 
        Customers.name AS "customer", 
        Customers.no AS "customerNo",
        Orders.notes,
        Orders.orderete_date AS "ordered",
        Orders.req_delivery AS "reqDelivery",
        Orders.status,
        Orders.address
        FROM Customers
        INNER JOIN Orders ON Orders.customer_id = Customers.id;`
    ).then(data => data.rows),

    getCustomerData: (userId) => db.query(
        `SELECT 
        Orders.id AS "orderNo", 
        Orders.notes,
        Orders.orderete_date AS "ordered",
        Orders.req_delivery AS "reqDelivery",
        Orders.status,
        Orders.address
        FROM Users
        INNER JOIN Customers On Customers.user_id = Users.id
        INNER JOIN Orders On Orders.customer_id = Customers.id
        WHERE Users.id = $1;`,
        [userId]
    ).then(data => data.rows),

    getProducts: (orderId) => db.query(
        `SELECT
       Goods.id AS "goodId",
        Products.code,
        Products.name,
        Units.unit,
        Goods.quantity
        FROM Products
        INNER JOIN Units ON Units.product_id = Products.id
        INNER JOIN Goods ON Goods.unit_id = Units.id
        WHERE Goods.order_id = $1;`,
        [orderId]
    ).then(data => data.rows),

    getCustomerAddressByOrderId: (orderId) => db.query(
        `SELECT Customers.address FROM Orders
        INNER JOIN Customers ON Customers.id = Orders.customer_id
        WHERE Orders.id = $1;`,
        [orderId]
    ).then(data => data.rows),

    getStatusById: (orderId) => db.query(
        `SELECT status FROM Orders WHERE id = $1;`,
        [orderId]
    ).then(data => data.rows),

    updateStatus: (newStatus, orderId) => db.query(
        `UPDATE Orders SET status = $1 WHERE id = $2;`,
        [newStatus, orderId]
    ),

    createOrder: ({ status, address, reqDelivery, ordered, notes, customerId }) => db.query(
        `INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [address, status, notes, customerId, reqDelivery, ordered]
    ).then(data => data.rows),

    checkUserOrder: (userId, orderId) => db.query(
        `SELECT * FROM Users 
        INNER JOIN Customers ON Customers.user_id = Users.id
        INNER JOIN  Orders ON Orders.customer_id = Customers.id
        WHERE Users.id = $1 AND Orders.id = $2;`,
        [userId, orderId]
    ).then(data => data.rows),

    updateOrder: ({ address, notes, orderId }) => db.query(
        `UPDATE Orders SET address = $1, notes = $2 WHERE id = $3;`,
        [address, notes, orderId]
    )
})