# Inventory Reservation System

A full-stack Inventory Reservation System developed as part of an internship assignment.

This application helps manage:
- Products
- Warehouses
- Inventory stock
- Product reservations
- Reservation status tracking
- Expiry-based inventory handling

The project was built using modern web technologies including Next.js, TypeScript, Prisma ORM, PostgreSQL, and Tailwind CSS.

---

# Project Overview

The system allows users to:

- Add and manage products
- Create warehouses
- Maintain inventory stock across warehouses
- Reserve products based on available stock
- Prevent over-reservation
- Track reservation status
- Handle expiry-based reservation logic

The project demonstrates:
- Full-stack application development
- REST API development
- Database schema design
- Relational database handling
- Prisma ORM integration
- Inventory reservation workflow implementation

---

# Features

## Product Management
- Add products
- View product details
- Manage product quantity and pricing
- Product inventory tracking

## Warehouse Management
- Create warehouses
- Store warehouse locations
- Maintain inventory mapping

## Inventory Management
- Add stock to warehouses
- View inventory details
- Warehouse-based stock management

## Reservation Management
- Create product reservations
- Validate stock availability
- Prevent invalid reservations
- Confirm reservations
- Release expired reservations

## Reservation Status Handling
The reservation system supports:
- PENDING
- CONFIRMED
- RELEASED
- EXPIRED

---

# Tech Stack

- Next.js
- TypeScript
- Node.js
- Prisma ORM
- PostgreSQL
- Supabase PostgreSQL
- Tailwind CSS
- REST APIs
- Git & GitHub

---

# Project Structure

```txt
/app
/api
/products
/reservations
/warehouses
/inventory

/lib
/prisma
/public
/screenshots

README.md
package.json
```

---

# Database Integration

The project uses Supabase PostgreSQL as the cloud-hosted relational database.

Prisma ORM is used for:
- Database schema design
- Query execution
- Relationship handling
- Database migrations
- CRUD operations

The application stores relational data for:
- Products
- Warehouses
- Inventory
- Reservations

---

# Database Design

## Product Table

Stores product details.

Fields:
- id
- name
- category
- quantity
- price
- createdAt

---

## Warehouse Table

Stores warehouse information.

Fields:
- id
- name
- location
- createdAt

---

## Inventory Table

Stores stock details for products inside warehouses.

Fields:
- id
- productId
- warehouseId
- stock
- createdAt

---

## Reservation Table

Stores reservation information.

Fields:
- id
- productId
- quantity
- status
- expiresAt
- createdAt

---

# Reservation Logic

The reservation workflow follows these rules:

1. Users can reserve only available inventory.
2. Reservation quantity is validated before insertion.
3. Reservations contain expiry time tracking.
4. Invalid reservations are prevented when stock is insufficient.
5. Reservation status is updated dynamically.
6. Expired reservations release inventory automatically.
7. Confirmed reservations are tracked separately.

Reservation states:
- PENDING
- CONFIRMED
- RELEASED
- EXPIRED

---

# API Endpoints

## Products API

```txt
/api/products
```

Functions:
- Create products
- Fetch products
- Manage product details

---

## Warehouses API

```txt
/api/warehouses
```

Functions:
- Create warehouses
- Fetch warehouse data

---

## Inventory API

```txt
/api/inventory
```

Functions:
- Manage inventory stock
- Map products with warehouses

---

## Reservations API

```txt
/api/reservations
```

Functions:
- Create reservations
- Validate stock
- Track expiry
- Manage reservation status

---

# Prisma Commands

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Database Migration

```bash
npx prisma migrate dev
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_supabase_postgresql_url
```

---

# How to Run Locally

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Open browser:

```txt
http://localhost:3000
```

---

# Screenshots

## Dashboard

![Dashboard](./screenshots/dashboard.png.jpeg)

---

## Product Management

![Products](./screenshots/products.png.jpeg)

---

## Product Details Table

![Product Table](./screenshots/product table.png.jpeg)

---

## Warehouse Management

![Warehouse](./screenshots/all product details.png.jpeg)

---

## Inventory Details

![Inventory](./screenshots/inventory details.jpeg)

---

## Reservation Management

![Reservation](./screenshots/Reservation.png.jpeg)

---

## Reservation Status Tracking

![Status](./screenshots/status.png.jpeg)

---

## Database Tables

![Database](./screenshots/database tables.png.jpeg)

---

## Reservation Database Table

![Reservation Database](./screenshots/reservation database table.png.jpeg)

---

# Deployment Status

The project was successfully developed and tested in the local environment.

The application build was completed successfully locally using:

```bash
npm run build
```

Deployment on Vercel faced Prisma environment configuration issues during production deployment.

Since the application was functioning correctly in the local environment, all project screenshots, source code, database schema, and API implementation have been included in this repository for evaluation purposes.

---

# Trade-offs

- Redis-based distributed locking was not implemented.
- Authentication was skipped to focus on reservation workflow functionality.
- Simplified concurrency handling was implemented for internship scope.
- UI design was kept simple to prioritize backend functionality and database logic.

---

# Future Improvements

- Add Redis locking
- Add user authentication
- Add admin dashboard
- Add analytics and logging
- Improve UI/UX
- Add automated cleanup jobs
- Add reservation history tracking
- Add role-based access control

---

# Learning Outcomes

This project helped explore:

- Full-stack application development
- Next.js App Router
- REST API development
- Prisma ORM integration
- PostgreSQL schema design
- Inventory reservation workflow
- Expiry-based reservation handling
- Database relationship management
- Git & GitHub workflow
- Deployment workflow basics

---

# GitHub Repository

Repository Link:

https://github.com/sridharshinirani-dev/allo-inventory

---

# Author

Developed as part of internship assignment submission.