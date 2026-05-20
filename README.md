# Courier Service App (Backend)

Backend API implemented in TypeScript with Express and Prisma (Postgres).

Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client and run migrations:

```bash
npx prisma generate
# create migration and apply (choose a name)
npx prisma migrate dev --name init
```

4. Start the dev server:

```bash
npm run dev
```

API Endpoints

- `POST /api/auth/register` — register { email, password, name?, address? }
- `POST /api/auth/login` — login { email, password } -> returns JWT
- `POST /api/shipments` — create shipment (auth)
- `GET /api/shipments` — list my shipments (auth)
- `GET /api/shipments/track/:trackingNumber` — public tracking
- `PATCH /api/shipments/:id/status` — update status (admin)

Notes

- This repository contains only the backend. A frontend React app should consume these APIs.
- For local testing use a local Postgres instance and set `DATABASE_URL` accordingly.
