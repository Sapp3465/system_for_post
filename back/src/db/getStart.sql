-- CREATE USER bravoeuser PASSWORD '1111';
-- ALTER ROLE bravouser createrole createdb;

\c postgres
DROP
    DATABASE bravo;
CREATE
    DATABASE bravo OWNER bravouser;
\c bravo

CREATE TABLE Users
(
    id            SERIAL       NOT NULL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    status        VARCHAR(50)  NOT NULL,
    creation_date BIGSERIAL    NOT NULL
);

CREATE TABLE Products
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    code         VARCHAR(255) NOT NULL UNIQUE,
    availability VARCHAR(255) NOT NULL
);

CREATE TABLE Customers
(
    id            SERIAL       NOT NULL PRIMARY KEY,
    no            VARCHAR(255) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    address       VARCHAR(255) NOT NULL,
    contact_name  VARCHAR(255) NOT NULL,
    delivery_days VARCHAR(255) NOT NULL,
    mobile_phone  VARCHAR(255) NULL,
    user_id       INT          NOT NULL REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Orders
(
    id            SERIAL      NOT NULL PRIMARY KEY,
    address       VARCHAR(255) NULL,
    status        VARCHAR(50) NOT NULL,
    req_delivery  BIGSERIAL   NOT NULL,
    orderete_date BIGSERIAL   NOT NULL,
    notes         TEXT        NULL,
    customer_id   INT         NOT NULL REFERENCES Customers (id) ON DELETE CASCADE
);

CREATE TABLE Replacements
(
    id            SERIAL NOT NULL PRIMARY KEY,
    replace_to_id INT    NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    product_id    INT    NOT NULL REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE Units
(
    id         SERIAL           NOT NULL PRIMARY KEY,
    unit       VARCHAR(255)     NOT NULL,
    price      double precision NOT NULL,
    product_id INT              NOT NULL REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE Exclusive
(
    id         SERIAL           NOT NULL PRIMARY KEY,
    percent    double precision NOT NULL,
    product_id INT              NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    user_id    INT              NOT NULL REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Goods
(
    id         SERIAL           NOT NULL PRIMARY KEY,
    quantity INT NOT NULL,
    order_id INT              NOT NULL REFERENCES Orders (id) ON DELETE CASCADE,
    unit_id    INT              NOT NULL REFERENCES Units (id) ON DELETE CASCADE
);

INSERT INTO Users (email, status, creation_date)
VALUES ('bshmalko97@gmail.com', 'admin', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave197@gmail.com', 'customer', 1625555312792);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('main-customer', 'Bohdan', 'Kosuba', 'Mr. Bohdan)', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '0959305377', 2);

-- TEST USERS

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave1@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave2@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave3@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave4@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave5@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave6@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave7@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave8@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave9@gmail.com', 'customer', 1625555312792);

INSERT INTO Users (email, status, creation_date)
VALUES ('ggave10@gmail.com', 'customer', 1625555312792);

-- TEST CUSTOMERS

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-1', 'Name1', 'address 1', 'Mr. Name1', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 3);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-2', 'Name2', 'address 2', 'Mr. Name2', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 4);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-3', 'Name1', 'address 10', 'Mr. Name3', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 5);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-4', 'Name1', 'address 3', 'Mr. Name4', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 6);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-5', 'Name1', 'address 4', 'Mr. Name5', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 7);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-6', 'Name1', 'address 5', 'Mr. Name6', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 8);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-7', 'Name1', 'address 6', 'Mr. Name7', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 9);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-9', 'Name1', 'address 7', 'Mr. Name8', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 10);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-10', 'Name1', 'address 8', 'Mr. Name9', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 11);

INSERT INTO Customers (no, name, address, contact_name, delivery_days, mobile_phone, user_id)
VALUES ('test-no-8', 'Name1', 'address 9', 'Mr. Name10', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":false,"sat":false,"san":false}', '123456789', 12);

-- TEST PRODUCTS
INSERT INTO Products (name, code, availability)
VALUES ('product1', 'prd-1', 'in stock');

INSERT INTO Products (name, code, availability)
VALUES ('product2', 'prd-2', 'out of stock');

INSERT INTO Products (name, code, availability)
VALUES ('product3', 'prd-3', 'in stock');

INSERT INTO Products (name, code, availability)
VALUES ('product4', 'prd-4', 'out of stock');

INSERT INTO Products (name, code, availability)
VALUES ('product5', 'prd-5', 'in stock');

INSERT INTO Products (name, code, availability)
VALUES ('product6', 'prd-6', 'out of stock');

INSERT INTO Products (name, code, availability)
VALUES ('product7', 'prd-7', 'discontinued');

INSERT INTO Products (name, code, availability)
VALUES ('product8', 'prd-8', 'discontinued');

INSERT INTO Products (name, code, availability)
VALUES ('product9', 'prd-9', 'in stock');

INSERT INTO Products (name, code, availability)
VALUES ('product10', 'prd-10', 'in stock');

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 1);

INSERT INTO Units (unit, price, product_id)
VALUES ('l', '150', 1);

INSERT INTO Units (unit, price, product_id)
VALUES ('box', '50', 1);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 5);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 6);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 7);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 8);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 9);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 10);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 2);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 3);

INSERT INTO Units (unit, price, product_id)
VALUES ('kg', '100', 4);

INSERT INTO Replacements (replace_to_id, product_id)
VALUES (1, 2);

INSERT INTO Replacements (replace_to_id, product_id)
VALUES (3, 2);

INSERT INTO Replacements (replace_to_id, product_id)
VALUES (4, 2);

INSERT INTO Replacements (replace_to_id, product_id)
VALUES (9, 7);

INSERT INTO Exclusive (percent, product_id, user_id)
VALUES (10, 10, 2);

INSERT INTO Exclusive (percent, product_id, user_id)
VALUES (10, 1, 2);

INSERT INTO Exclusive (percent, product_id, user_id)
VALUES (10, 3, 3);

-- TEST ORDERS

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES (NULL, 'new', NULL, 1, 1626957601479, 1626957601678);

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES ('some test address 2', 'canceled', NULL, 1, 1626957601479, 1626957601678);

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES ('some test address 3', 'in process', NULL, 1, 1626957601479, 1626957601678);

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES (NULL, 'delivered', 'my notes', 2, 1626957601479, 1626957601678);

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES ('some test address 5', 'completed', 'my notes', 3, 1626957601479, 1626957601678);

INSERT INTO Orders (address, status, notes, customer_id, req_delivery, orderete_date)
VALUES ('some test address 6', 'new', 'my notes', 4, 1626957601479, 1626957601678);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 1, 1);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 1, 7);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 1, 10);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 2, 2);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 2, 7);

INSERT INTO Goods (quantity, order_id, unit_id)
VALUES (19, 4, 9);
