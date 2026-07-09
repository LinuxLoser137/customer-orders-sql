USE CustomerOrdersDB;
GO

INSERT INTO Customers (customer_id, first_name, last_name, email, city)
VALUES
(1, 'Savannah', 'Young', 'savannah@example.com', 'Anderson'),
(2, 'Ricky', 'Redder', 'ricky@example.com', 'Anderson'),
(3, 'Mason', 'Redder', 'mason@example.com', 'Anderson'),
(4, 'Noah', 'Redder', 'noah@example.com', 'Anderson'),
(5, 'Oakley', 'Young-Redder', 'oakley@example.com', 'Anderson');

INSERT INTO Products (product_id, product_name, category, price)
VALUES
(1, 'Laptop', 'Electronics', 799.99),
(2, 'Wireless Mouse', 'Electronics', 24.99),
(3, 'Notebook', 'Office Supplies', 4.99),
(4, 'Desk Chair', 'Furniture', 129.99),
(5, 'Water Bottle', 'Accessories', 14.99);

INSERT INTO Orders (order_id, customer_id, order_date)
VALUES
(1, 1, '2026-07-01'),
(2, 2, '2026-07-02'),
(3, 1, '2026-07-03'),
(4, 3, '2026-07-04'),
(5, 4, '2026-07-05');

INSERT INTO OrderDetails (order_detail_id, order_id, product_id, quantity)
VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 4, 1),
(4, 3, 3, 5),
(5, 4, 5, 3),
(6, 5, 2, 1),
(7, 5, 3, 2);