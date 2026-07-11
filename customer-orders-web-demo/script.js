const customers = [
  { customer_id: 1, first_name: "Savannah", last_name: "Young", email: "savannah@example.com", city: "Anderson" },
  { customer_id: 2, first_name: "Ricky", last_name: "Redder", email: "ricky@example.com", city: "Anderson" },
  { customer_id: 3, first_name: "Mason", last_name: "Redder", email: "mason@example.com", city: "Anderson" },
  { customer_id: 4, first_name: "Noah", last_name: "Redder", email: "noah@example.com", city: "Anderson" },
  { customer_id: 5, first_name: "Oakley", last_name: "Young-Redder", email: "oakley@example.com", city: "Anderson" }
];
const products = [
  { product_id: 1, product_name: "Laptop", category: "Electronics", price: 799.99 },
  { product_id: 2, product_name: "Wireless Mouse", category: "Electronics", price: 24.99 },
  { product_id: 3, product_name: "Notebook", category: "Office Supplies", price: 4.99 },
  { product_id: 4, product_name: "Desk Chair", category: "Furniture", price: 129.99 },
  { product_id: 5, product_name: "Water Bottle", category: "Accessories", price: 14.99 }
];
const orders = [
  { order_id: 1, customer_id: 1, order_date: "2026-07-01" },
  { order_id: 2, customer_id: 2, order_date: "2026-07-02" },
  { order_id: 3, customer_id: 1, order_date: "2026-07-03" },
  { order_id: 4, customer_id: 3, order_date: "2026-07-04" },
  { order_id: 5, customer_id: 4, order_date: "2026-07-05" }
];
const orderDetails = [
  { order_detail_id: 1, order_id: 1, product_id: 1, quantity: 1 },
  { order_detail_id: 2, order_id: 1, product_id: 2, quantity: 2 },
  { order_detail_id: 3, order_id: 2, product_id: 4, quantity: 1 },
  { order_detail_id: 4, order_id: 3, product_id: 3, quantity: 5 },
  { order_detail_id: 5, order_id: 4, product_id: 5, quantity: 3 },
  { order_detail_id: 6, order_id: 5, product_id: 2, quantity: 1 },
  { order_detail_id: 7, order_id: 5, product_id: 3, quantity: 2 }
];
const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");
const resultsTitle = document.querySelector("#resultsTitle");
const statusMessage = document.querySelector("#statusMessage");
const searchInput = document.querySelector("#searchInput");
const resetButton = document.querySelector("#resetButton");
let currentRows = [];
let currentColumns = [];
const money = value => `$${Number(value).toFixed(2)}`;
const customerById = id => customers.find(customer => customer.customer_id === id);
const productById = id => products.find(product => product.product_id === id);
const orderById = id => orders.find(order => order.order_id === id);
function buildOrderDetails() {
  return orderDetails.map(detail => {
    const order = orderById(detail.order_id);
    const customer = customerById(order.customer_id);
    const product = productById(detail.product_id);
    return { order_id: detail.order_id, customer: `${customer.first_name} ${customer.last_name}`, product: product.product_name, quantity: detail.quantity, price: money(product.price), item_total: money(detail.quantity * product.price) };
  });
}
function buildCustomerSpending() {
  return customers.map(customer => {
    const customerOrders = orders.filter(order => order.customer_id === customer.customer_id);
    const total = customerOrders.reduce((sum, order) => sum + orderDetails.filter(detail => detail.order_id === order.order_id).reduce((orderSum, detail) => orderSum + detail.quantity * productById(detail.product_id).price, 0), 0);
    return { customer: `${customer.first_name} ${customer.last_name}`, total_spent: money(total) };
  }).sort((a,b) => Number(b.total_spent.replace("$", "")) - Number(a.total_spent.replace("$", "")));
}
function buildOrderCounts() {
  return customers.map(customer => ({ customer: `${customer.first_name} ${customer.last_name}`, number_of_orders: orders.filter(order => order.customer_id === customer.customer_id).length })).sort((a,b) => b.number_of_orders - a.number_of_orders);
}
function renderRows(rows) {
  tableBody.replaceChildren();
  rows.forEach(row => {
    const tr = document.createElement("tr");
    currentColumns.forEach(column => {
      const td = document.createElement("td");
      td.textContent = row[column.key];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
  statusMessage.textContent = `Showing ${rows.length} result${rows.length === 1 ? "" : "s"}.`;
}
function renderTable(rows, columns, title) {
  currentRows = rows;
  currentColumns = columns;
  resultsTitle.textContent = title;
  tableHead.replaceChildren();
  const headerRow = document.createElement("tr");
  columns.forEach(column => { const th = document.createElement("th"); th.textContent = column.label; headerRow.appendChild(th); });
  tableHead.appendChild(headerRow);
  renderRows(rows);
}
function runQuery(queryName) {
  searchInput.value = "";
  if (queryName === "customers") renderTable(customers, [
    { key: "customer_id", label: "Customer ID" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" }, { key: "email", label: "Email" }, { key: "city", label: "City" }
  ], "All Customers");
  if (queryName === "orders") {
    const rows = orders.map(order => { const customer = customerById(order.customer_id); return { order_id: order.order_id, customer: `${customer.first_name} ${customer.last_name}`, order_date: order.order_date }; });
    renderTable(rows, [{ key: "order_id", label: "Order ID" }, { key: "customer", label: "Customer" }, { key: "order_date", label: "Order Date" }], "Customers and Orders");
  }
  if (queryName === "details") renderTable(buildOrderDetails(), [
    { key: "order_id", label: "Order ID" }, { key: "customer", label: "Customer" }, { key: "product", label: "Product" }, { key: "quantity", label: "Quantity" }, { key: "price", label: "Price" }, { key: "item_total", label: "Item Total" }
  ], "Order Details");
  if (queryName === "spending") renderTable(buildCustomerSpending(), [{ key: "customer", label: "Customer" }, { key: "total_spent", label: "Total Spent" }], "Total Spent by Customer");
  if (queryName === "counts") renderTable(buildOrderCounts(), [{ key: "customer", label: "Customer" }, { key: "number_of_orders", label: "Number of Orders" }], "Orders per Customer");
  if (queryName === "expensive") {
    const product = [...products].sort((a,b) => b.price - a.price)[0];
    renderTable([{ product_id: product.product_id, product_name: product.product_name, category: product.category, price: money(product.price) }], [
      { key: "product_id", label: "Product ID" }, { key: "product_name", label: "Product" }, { key: "category", label: "Category" }, { key: "price", label: "Price" }
    ], "Most Expensive Product");
  }
}
document.querySelectorAll("[data-query]").forEach(button => button.addEventListener("click", () => runQuery(button.dataset.query)));
searchInput.addEventListener("input", event => {
  const term = event.target.value.trim().toLowerCase();
  const filtered = currentRows.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(term)));
  renderRows(filtered);
});
resetButton.addEventListener("click", () => {
  currentRows = []; currentColumns = []; searchInput.value = ""; tableHead.replaceChildren(); tableBody.replaceChildren(); resultsTitle.textContent = "Customer Orders Data"; statusMessage.textContent = "Select a query above to display results.";
});
document.querySelector("#customerCount").textContent = customers.length;
document.querySelector("#productCount").textContent = products.length;
document.querySelector("#orderCount").textContent = orders.length;
const totalRevenue = orderDetails.reduce((sum, detail) => sum + detail.quantity * productById(detail.product_id).price, 0);
document.querySelector("#totalRevenue").textContent = money(totalRevenue);
