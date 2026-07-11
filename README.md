# Customer Orders SQL Project

## Project Description

This beginner SQL project creates a small customer order database for a store. The database tracks customers, products, orders, and order details. The project demonstrates how relational databases work by using primary keys, foreign keys, joins, grouping, and basic calculations.

## Live Web Demo

[View the deployed Customer Orders SQL Dashboard](PASTE-YOUR-NETLIFY-LINK-HERE)

The browser-based demo recreates the project’s main query results so visitors can explore customers, products, orders, spending totals, and order details without installing SQL Server.

## Database Tables

This project includes four tables:

- Customers
- Products
- Orders
- OrderDetails

## Skills Practiced

- Creating a database
- Creating tables
- Using primary keys
- Using foreign keys
- Inserting sample data
- Writing `SELECT` queries
- Filtering with `WHERE`
- Sorting with `ORDER BY`
- Joining multiple tables
- Using `SUM` and `COUNT`
- Grouping data with `GROUP BY`
- Using `LEFT JOIN` to include customers with no orders
- Using `COALESCE` to replace `NULL` values with `0`

## Example Questions Answered

The SQL queries answer questions such as:

- Which customers placed orders?
- What products were included in each order?
- How much did each customer spend?
- How many orders did each customer place?
- What is the most expensive product?
- Which products were ordered more than once?

## Files Included

- `create_tables.sql` — creates the database and tables
- `insert_data.sql` — inserts sample customers, products, orders, and order details
- `queries.sql` — includes SQL queries used to analyze the data
- `customer-orders-web-demo/` — contains the deployable HTML, CSS, and JavaScript version of the project

## Web Demo Technologies

- HTML
- CSS
- JavaScript
- Responsive web design
- Netlify

## About the Web Version

The original SQL project was created for SQL Server. The web demo uses JavaScript data that matches the records in the SQL scripts so employers and visitors can interact with the project directly in a browser.

The demo includes:

- Customer records
- Product records
- Order history
- Joined order details
- Customer spending totals
- Order counts
- The most expensive product
- Searchable query results

## What I Learned

Through this project, I practiced designing a relational database and writing SQL queries to retrieve useful business information. I learned how multiple tables connect through primary and foreign keys and how `JOIN` queries combine related data.

I also practiced using aggregate functions such as `SUM` and `COUNT` to calculate customer spending, order totals, and order activity. Creating the browser-based demo also helped me practice presenting database results in an interactive and user-friendly format.
