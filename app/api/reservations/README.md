# Inventory Reservation System

A simple Inventory Reservation System developed as part of an internship assignment.  
This project allows users to manage inventory, create reservations, and handle reservation expiry logic using modern full-stack technologies.

The application was built using Next.js, Prisma ORM, PostgreSQL, and Tailwind CSS.

---

# Features

- Add and manage products
- View available inventory
- Create inventory reservations
- Validate stock availability before reservation
- Reservation expiry handling
- Prevent over-reservation of products
- REST API routes using Next.js
- PostgreSQL database integration
- Responsive user interface
- Prisma ORM for database management

---

# Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Vercel
- Node.js

---

# Project Structure

```txt
/app
/api
/components
/lib
/prisma
/public
/screenshots
README.md
package.json
```

---

# Database Design

## Product Table

Stores product inventory details.

Fields:

- id
- name
- quantity
- createdAt

## Reservation Table

Stores reservation details.

Fields:

- id
- productId
- quantity
- status
- expiresAt
- createdAt

---

# Reservation Logic

The reservation system follows these rules:

1. Users can reserve only available inventory.
2. Reservation quantity is validated before insertion.
3. Reservations include an expiry time.
4. Expired reservations automatically release inventory.
5. Invalid reservations are prevented when stock is insufficient.
6. Reservation status is tracked using values like:
   - PENDING
   - EXPIRED
   - CONFIRMED

---

# API Endpoints

## Products API

```txt
/api/products
```

Functions:

- Create product
- Fetch products

## Reservations API

```txt
/api/reservations
```

Functions:

- Create reservation
- Validate inventory
- Manage reservation expiry

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

# Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=your_postgresql_database_url
```

---

# PostgreSQL Database

The project uses PostgreSQL database integration through Prisma ORM.

Supported providers:

- Supabase
- Neon
- Railway PostgreSQL

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
# Screenshots

## Dashboard

![Dashboard](./screenshots/dashboard.png)

## Product Management

![Products](./screenshots/products.png)

## Warehouse Management

![Warehouse](./screenshots/warehouse.png)

## Inventory Details

![Inventory](./screenshots/inventory.png)

## Reservation Management

![Reservation](./screenshots/reservation.png)

## Reservation Status Tracking

![Reservation Status](./screenshots/status.png)

# Deployment Status

The application was developed and tested successfully in the local environment.

Deployment on Vercel is currently under configuration due to Prisma and environment setup issues. Complete source code and screenshots are included in this repository.

---

# Trade-offs

- Redis-based distributed locking was not implemented.
- Authentication was skipped to focus on core inventory functionality.
- Simplified concurrency handling was implemented for internship scope.
- Basic UI was prioritized over advanced styling.

---

# Future Improvements

- Add Redis locking
- Add user authentication
- Add admin dashboard
- Add analytics and logs
- Improve UI/UX
- Add automated cleanup jobs
- Add reservation history tracking

---

# Learning Outcomes

Through this project, the following concepts were explored:

- Full-stack application development
- API route handling in Next.js
- Database integration with Prisma
- PostgreSQL schema design
- Reservation system implementation
- Expiry-based logic handling
- GitHub project management
- Deployment workflow basics

---

# Author

Developed as part of internship assignment submission.