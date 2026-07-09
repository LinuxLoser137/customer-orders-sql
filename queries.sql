USE CustomerOrdersDB;
GO

-- View all customers
SELECT *
FROM Customers;

-- View all products
SELECT *
FROM Products;

-- View all orders
SELECT *
FROM Orders;

-- View all order details
SELECT *
FROM OrderDetails;

-- Show customers and their orders
SELECT 
    Customers.first_name,
    Customers.last_name,
    Orders.order_id,
    Orders.order_date
FROM Customers
JOIN Orders
ON Customers.customer_id = Orders.customer_id;

-- Show each order with product names and quantities
SELECT
    Orders.order_id,
    Customers.first_name,
    Customers.last_name,
    Products.product_name,
    OrderDetails.quantity
FROM Orders
JOIN Customers
ON Orders.customer_id = Customers.customer_id
JOIN OrderDetails
ON Orders.order_id = OrderDetails.order_id
JOIN Products
ON OrderDetails.product_id = Products.product_id;

-- Calculate total cost for each item ordered
SELECT
    Orders.order_id,
    Customers.first_name,
    Customers.last_name,
    Products.product_name,
    OrderDetails.quantity,
    Products.price,
    OrderDetails.quantity * Products.price AS item_total
FROM Orders
JOIN Customers
ON Orders.customer_id = Customers.customer_id
JOIN OrderDetails
ON Orders.order_id = OrderDetails.order_id
JOIN Products
ON OrderDetails.product_id = Products.product_id;

-- Calculate total spent by each customer
SELECT
    Customers.first_name,
    Customers.last_name,
    COALESCE(SUM(OrderDetails.quantity * Products.price), 0) AS total_spent
FROM Customers
LEFT JOIN Orders
ON Customers.customer_id = Orders.customer_id
LEFT JOIN OrderDetails
ON Orders.order_id = OrderDetails.order_id
LEFT JOIN Products
ON OrderDetails.product_id = Products.product_id
GROUP BY Customers.first_name, Customers.last_name
ORDER BY total_spent DESC;

-- Count how many orders each customer placed
SELECT
    Customers.first_name,
    Customers.last_name,
    COUNT(Orders.order_id) AS number_of_orders
FROM Customers
LEFT JOIN Orders
ON Customers.customer_id = Orders.customer_id
GROUP BY Customers.first_name, Customers.last_name
ORDER BY number_of_orders DESC;

-- Find the most expensive product
SELECT TOP 1
    product_id,
    product_name,
    category,
    price
FROM Products
ORDER BY price DESC;

-- Find all orders placed by Savannah
SELECT
    Customers.first_name,
    Customers.last_name,
    Orders.order_id,
    Orders.order_date
FROM Customers
JOIN Orders
ON Customers.customer_id = Orders.customer_id
WHERE Customers.first_name = 'Savannah';

-- Find products ordered more than once
SELECT
    Orders.order_id,
    Customers.first_name,
    Customers.last_name,
    Products.product_name,
    OrderDetails.quantity
FROM Orders
JOIN Customers
ON Orders.customer_id = Customers.customer_id
JOIN OrderDetails
ON Orders.order_id = OrderDetails.order_id
JOIN Products
ON OrderDetails.product_id = Products.product_id
WHERE OrderDetails.quantity > 1;