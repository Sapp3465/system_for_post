const queryLike = (availability, template = '') => {
    let queryString = '';
    if (availability.inStock) queryString += `availability = 'in stock'`

    if (availability.outOfStock) {
        if (queryString) queryString += ' OR ';
        queryString += `availability = 'out of stock'`
    }

    if (availability.discontinued) {
        if (queryString) queryString += ' OR ';
        queryString += `availability = 'discontinued'`
    }

    if (!queryString) queryString = '1 = 0'

    if(template) {
        queryString += `AND (code ~* '${template}' 
        OR name ~* '${template}'
        OR availability ~* '${template}')`
    }

    return queryString
}

module.exports = db => ({
    deleteAll: () => db.query(
        `DELETE
         FROM Products
         WHERE id > 0;`,
    ),

    addProduct: ({code, name, availability}) => db.query(
        `INSERT INTO Products (code, name, availability)
         VALUES ($1, $2, $3)
         RETURNING id;`,
        [code, name, availability]
    ).then(data => data.rows),

    getIdByCode: (code) => db.query(
        `SELECT *
         FROM Products
         WHERE code = $1;`,
        [code]
    ).then(data => data.rows),

    deleteById: (id) => db.query(
        `DELETE
         FROM Products
         WHERE id = $1;`,
        [id]
    ),

    getAllCode: () => db.query(
        `SELECT code
         FROM Products;`
    ).then(data => data.rows),

    getManyProducts: (start, howMany) => db.query(
        `SELECT id, code, name, availability
         FROM Products
         LIMIT $2 OFFSET $1;`,
        [start, howMany]
    ),

    getManyProductsLike: (template, start, howMany) => db.query(
        `SELECT id, code, name, availability
        FROM Products 
        where code ~* '${template}' 
        OR name ~* '${template}'
        OR availability ~* '${template}'
        LIMIT $2 OFFSET $1;`,
        [start, howMany]
    ),

    updateProduct: ({id, code, name, availability}) => db.query(
        `UPDATE Products
         SET code = $2,
             name = $3,
             availability = $4
         WHERE id = $1;`,
        [id, code, name, availability]
    ),

    sortedByAvailability: async (availability, start, howMany, template) =>  db.query(
            `SELECT id, code, name, availability
        FROM Products 
        WHERE 0 = 0 AND ${queryLike(availability, template)} 
        LIMIT $2 OFFSET $1;`,
            [start, howMany]
        ),

    allProductsSize: () => db.query(
        `SELECT COUNT(id) FROM Products;`
    ).then(data => data.rows[0].count),

    availabilityProductsSize: (availability, template) => db.query(
        `SELECT COUNT(id)
        FROM Products 
        WHERE 0 = 0 AND ${queryLike(availability, template)}`
    ).then(data => data.rows[0].count),

    likeProductsSize: (template) => db.query(
        `SELECT COUNT(id)
        FROM Products 
        where code ~* '${template}' 
        OR name ~* '${template}'
        OR availability ~* '${template}';`,
    ).then(data => data.rows[0].count),
})