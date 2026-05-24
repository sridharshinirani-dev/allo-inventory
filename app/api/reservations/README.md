# Inventory Reservation System

A simple inventory reservation system built using Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## Features

- Add products
- View inventory
- Reserve products
- Expiry-based reservation handling
- PostgreSQL database integration
- API routes using Next.js
- Responsive UI

## Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Vercel

## Project Structure

```txt
/app
/api
/components
/prisma
/lib
```

## How to Run Locally

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
```

## Reservation Logic

- Users can reserve available inventory.
- Reservation quantity is validated before creation.
- Reservations expire after a fixed time.
- Expired reservations release inventory automatically.
- The system prevents invalid reservations when stock is unavailable.

## Deployment

The application is deployed using Vercel.

## Trade-offs

- Redis-based distributed locking was not implemented.
- Authentication was skipped to focus on core reservation functionality.
- Simplified concurrency handling for internship scope.

## Future Improvements

- Add Redis locking
- Add authentication
- Add admin dashboard
- Improve UI/UX
- Add analytics and logs

## Author

Developed as part of internship assignment submission.