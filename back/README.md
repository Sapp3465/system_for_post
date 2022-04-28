# API

## AUTH

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
send code in email | /auth/sendLogin | POST | { email } | NO | { token }/{message : "error"}
send code in email | /auth/sendRegistration | POST | { email, name, address, contactName, deliveryDays, ?mobilePhone, no } | NO | { token }/{message : "error"}
login user | /auth/login | POST | { secretKey } | YES | { token, status }/{message : "error"}
register user | /auth/register | POST | { secretKey } | YES | { token, status }/{message : "error"}

## ADMIN

description | url | method | body | need token | response
----|----|--------|-------------|------------|-------
get customers | /admin/getCustomers/:start/:howMany | GET | ----- | YES | {size, data: [{ no, name, address, deliveryDays }]}/{message : "error"}
edit customer | /admin/editCustomer | PUT | {id, no, deliveryDays} | YES | {message: "ok"}/{message : "error"}
get customers like template | /admin/getCustomersLike/:template/:start/:howMany | GET | ----- | YES | {size, data: [{ no, name, address, deliveryDays }]}/{message : "error"}
delete product | /admin/deleteProduct/:id | DELETE | ----- | YES | {message: "ok"}/{message : "error"}
add product | /admin/addProduct | POST | {code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]} | YES | {id}/{message : "error"}
edit product | /admin/addProduct | PUT | {id, code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]} | YES | {message: "ok"}/{message : "error"}
all customers no | /admin/allCustomersNo | GET | ----- | YES | ["no"]/{message : "error"}
all products code | /admin/allProductsCode | GET | ----- | YES | ["code"]/{message : "error"}
replace products table | /admin/replaceCatalog | POST | [{code, name, units: [{unit, price}], availability, exclusive: ["no"], replacement: ["code"]}] | YES | {message: "ok"}/{message : "error"}
get all orders | /admin/getOrders | GET | ---- | YES | [{orderNo, customer, customerNo, items, notes, ordered, reqDelivery, status, products:[{goodId, code, name, unit, quantity}]}]/{ message: "error" }
change order status | /admin/changeOrderStatus | PUT | {orderNo, status} | YES | {message : "ok"}/{message : "error"}
create new order | /admin/createOrder | POST | {customerNo, ?notes, ?reqDelivery, ?address, products: [{code, unit, quantity}]} | YES | {orderNo, customer, customerNo, items, notes, ordered, reqDelivery, status, products:[{goodId, code, name, unit, quantity}]}/{ message: "error" }


## CLIENT

description | url | method | {body}/params | need token | response
----|----|--------|-------------|------------|-------
get all customer orders | /customer/getOrders | GET | ---- | YES | [{orderNo, items, notes, ordered, reqDelivery, status, products:[{goodId, code, name, unit, quantity}]}]/{ message: "error" }
change order status | /customer/changeOrderStatus | PUT | {orderNo, status} | YES | {message : "ok"}/{message : "error"}
create new order | /customer/createOrder | POST | {?notes, ?address, products: [{code, unit, quantity}]} | YES | {orderNo, items, notes, ordered, reqDelivery, status, products:[{goodId, code, name, unit, quantity}]}/{ message: "error" }
edit order | /customer/editOrder | PUT | {orderNO, notes, address, products:[{goodId, code, name, unit, quantity}]} | YES | {message : "ok"}/{message : "error"}

## COMMON

description | url | method | {body}/params | need token | response
----|----|--------|-------------|------------|-------
get products | /common/getProducts/:start/:howMany | GET | ----- | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}
get products like template | /common/getProductsLike/:template/:start/:howMany | GET | ----- | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}
get sorted by availability data | /common/sortAvailability | POST | {start, howMany, inStock:{inStock, outOfStock, discontinued}} | YES | {size, data: [{id, code, name, units: [{unit, price}], availability}]}/{message : "error"}
get all units params | /common/getUnits | GET | ----- | YES | [{code, units: [""]}]/{message : "error"}
