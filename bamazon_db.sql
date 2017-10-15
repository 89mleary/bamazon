DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(11),
    stock_quantity INTEGER(11),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-Shirt", "Clothing", 20, 50),
("Lamp", "Household Goods", 15, 100),
("Toolset", "Hardware", 75, 60),
("Jeans", "Clothing", 55, 65),
("Blender", "Kitchen", 40, 50),
("Pens", "Office", 10, 200),
("TV", "Electronics", 99, 175),
("DVD", "Electronics", 25, 99),
("Dress", "Clothing", 40, 50),
("Doll", "Toys", 30, 15);

SELECT * FROM products;