# Inventory & Order Management System

The application allows an admin to manage products and create customer orders while maintaining inventory through backend business logic.

## Features

### Product Management

* View all products
* Add new products
* Edit existing products
* Delete products
* Product fields:
  * Name
  * Description
  * Price
  * Stock
  * Category
  * Status
* Basic form validation
* Loading and empty states

### Order Management

* View all orders
* Create an order
* Select a product and quantity
* Calculate order total
* View order details
* Update order status
* Maintain product stock when orders are created
* Backend validation for product and stock availability

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Node.js**
* **MongoDB**
* **Mongoose**
* **Tailwind CSS**
* **Git & GitHub**
* **Postman** for API testing

## Project Structure

```text
app/
├── api/
│   ├── products/
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   │
│   └── orders/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
│
├── products/
│   └── page.tsx
│
├── orders/
│   └── page.tsx
│
└── page.tsx

components/
├── products/
│   ├── ProductPage.tsx
│   ├── ProductForm.tsx
│   ├── ProductTable.tsx
│   └── EditProductForm.tsx
│
└── orders/
    ├── OrderPage.tsx
    ├── OrderTable.tsx
    └── OrderForm.tsx

lib/
└── mongodb.ts

models/
    ├── Order.ts
    └── Product.ts
```

## API Endpoints

### Products

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/products`     | Get all products |
| GET    | `/api/products/:id` | Get a product    |
| POST   | `/api/products`     | Create a product |
| PATCH  | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Orders

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/api/orders`     | Create an order     |
| GET    | `/api/orders`     | Get all orders      |
| PATCH  | `/api/orders/:id` | Update order status |

## Database

This implementation uses **MongoDB as the only database**.

MongoDB stores:

* Products
* Orders
* Order items

Mongoose is used to define schemas and communicate with MongoDB.

### Product

A product contains:

```text
name
description
price
category
stock
status
createdAt
updatedAt
```

### Order

An order contains:

```text
items
totalAmount
status
createdAt
updatedAt
```

Each order item contains:

```text
productId
productName
quantity
price
```

## Order Creation Logic

When an order is created, the backend:

1. Validates the requested product
2. Checks available stock
3. Calculates the order total
4. Creates the order
5. Stores the order items
6. Reduces the product stock

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

## Installation

Clone the repository:

```bash
git clone https://github.com/abhishekkumar011/Inventry-order-system.git
```

Navigate to the project:

```bash
cd inventory-order-management
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and add your MongoDB connection string.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Pages

### Dashboard

```text
/
```

Provides an overview of the inventory.

### Products

```text
/products
```

Used to create, view, edit and delete products.

### Orders

```text
/orders
```

Used to create and manage orders.

## API Testing

The APIs were tested using **Postman**.

## Future Improvements

The following features can be added if required:

* PostgreSQL integration for order data
* Multiple products in a single order through the UI
* Product search
* Product filtering
* Dedicated `/orders/[id]` route
* More advanced order status transition validation
* Improved transaction handling across inventory and order operations
* Authentication and authorization

## Learning Outcomes

This project demonstrates practical experience with:

* Next.js App Router
* React components
* TypeScript
* REST API development
* MongoDB and Mongoose
* CRUD operations
* Form handling and validation
* Inventory business logic
* Order management
* Git and GitHub
* API testing with Postman
* Component-based frontend architecture
