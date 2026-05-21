# Half Life Courier - PERN Full Stack Application Documentation

A professional courier service management system built with **TypeScript**, **Express**, **React**, **Prisma**, **PostgreSQL**, **JWT authentication**, and **Redux Toolkit**.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup with Docker](#backend-setup-with-docker)
- [Frontend Setup](#frontend-setup)
- [Admin Account](#admin-account)
- [API Features](#api-features)
- [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
bcoinc/
├── backend/                    # Express.js API with Prisma ORM
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth & validation
│   │   └── server.ts           # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Database seeder
│   ├── docker-compose.yml      # Docker setup
│   ├── Dockerfile              # Container config
│   └── package.json
│
└── frontend/                   # React + Vite frontend
    ├── src/
    │   ├── pages/              # Page components
    │   ├── components/         # Reusable UI components
    │   ├── features/           # Redux slices
    │   └── lib/                # Utilities (API, storage)
    ├── vite.config.ts          # Vite configuration
    └── package.json
```

---

## ⚙️ Prerequisites

Before starting, ensure you have installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/)

Verify installation:
```bash
node --version      # v18 or higher
docker --version    # Docker version 20+
docker-compose --version  # Should be installed with Docker Desktop
git --version       # Any recent version
```

---

## 🚀 Backend Setup with Docker

### Quick Start (Recommended)

The backend uses **Docker Compose** to automatically set up PostgreSQL database and the Express server.

#### Step 1: Navigate to Backend

```bash
cd backend
```

#### Step 2: Create Environment File

```bash
cp .env.example .env
```

Update `.env` with your values:
```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"

# JWT Secret (use a strong random string in production)
JWT_SECRET="your-secure-secret-key-here"

# Admin Account (auto-created on startup)
ADMIN_EMAIL="admin@courier.com"
ADMIN_PASSWORD="admin123456"

# Server Port
PORT=4000
```

#### Step 3: Start with Docker Compose

```bash
docker-compose up -d
```

This command will:
- ✅ Start PostgreSQL 15 database on port 5432
- ✅ Create database and schema
- ✅ Run Prisma migrations automatically
- ✅ Seed the database with admin account
- ✅ Start Express server on port 4000

#### Step 4: Verify Backend is Running

```bash
# Check if services are running
docker-compose ps

# View backend logs
docker-compose logs -f app

# Test API endpoint
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer test"
```

You should see the backend running on `http://localhost:3000`

---

## 👤 Admin Account

### Default Admin Credentials

When the backend starts with Docker, an admin account is **automatically created**:

```
Email:    admin@courier.com
Password: admin123456
```

These credentials are configured in the `.env` file:

```env
ADMIN_EMAIL="admin@courier.com"
ADMIN_PASSWORD="admin123456"
```

### Change Admin Credentials

Edit `.env` file before starting Docker:

```env
ADMIN_EMAIL="your-admin-email@company.com"
ADMIN_PASSWORD="your-secure-password-here"
```

Then restart the containers:

```bash
docker-compose down
docker-compose up -d
```

### First Login

1. Frontend runs on `http://localhost:3000`
2. Click "Login"
3. Enter admin credentials:
   - Email: `admin@courier.com`
   - Password: `admin123456`
4. You'll have access to:
   - Dashboard (view all shipments)
   - Admin panel (manage users)
   - Status updates (modify shipment status)

---

## Frontend Setup

### Install and Run

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 🔌 API Features

### Authentication
- **Register**: Create new user account with email, password, name, address
- **Login**: Email + password authentication with JWT token
- **JWT Auth**: Secure token-based authentication (7-day expiration)

### Shipment Management
- **Create Shipment**: Add new shipment with recipient details
- **Track Shipment**: Public tracking using unique tracking number
- **View Shipments**: 
  - Regular users see only their shipments
  - Admin sees all shipments
- **Update Status**: Admin can update shipment status (PENDING → IN_TRANSIT → DELIVERED/CANCELLED)

### Admin Features
- **User Management**: Promote/demote users between regular and admin roles
- **Shipment Control**: Update shipment status and manage all shipments
- **User List**: View all registered users and their roles

---

## Database Schema

### User Model
```typescript
{
  id: string              // Unique identifier
  email: string           // Unique email address
  password: string        // Hashed with bcrypt
  name: string            // User's full name
  address: string         // User's address
  isAdmin: boolean        // Admin flag (default: false)
  createdAt: Date         // Account creation date
  updatedAt: Date         // Last update date
}
```

### Shipment Model
```typescript
{
  id: string              // Unique identifier
  trackingNumber: string  // Unique tracking code
  userId: string          // Foreign key to User
  senderName: string      // Sender's name
  senderAddress: string   // Sender's address
  recipientName: string   // Recipient's name
  recipientAddress: string// Recipient's address
  details: string         // Optional package details
  status: enum            // PENDING | IN_TRANSIT | DELIVERED | CANCELLED
  createdAt: Date         // Creation date
  updatedAt: Date         // Last update date
}
```

---

## 🛠️ Docker Commands Reference

### Start Services
```bash
cd backend
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Only backend
docker-compose logs -f app

# Only database
docker-compose logs -f db
```

### Restart Services
```bash
docker-compose restart
```

### Reset Database (⚠️ WARNING: Deletes all data)
```bash
docker-compose down -v
docker-compose up -d
```

### Access Database GUI (Prisma Studio)
```bash
npx prisma studio
```
Opens database UI at `http://localhost:5555`

---

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Shipments
- `POST /api/shipments` - Create shipment (authenticated)
- `GET /api/shipments` - Get shipments (all if admin, own if user)
- `GET /api/shipments/track/:trackingNumber` - Track shipment (public)
- `PATCH /api/shipments/:id/status` - Update status (admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id/role` - Update user role

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 4000 is available
lsof -i :4000

# Check logs for errors
docker-compose logs app

# Restart fresh
docker-compose down
docker-compose up -d
```

### Cannot connect to database
```bash
# Ensure Docker Desktop is running
docker ps

# Check database is running
docker-compose ps

# View database logs
docker-compose logs db
```

### Permission denied error
```bash
# Windows: Run Docker Desktop as Administrator
# Linux: Add user to docker group
sudo usermod -aG docker $USER
```

### Port already in use
```bash
# Kill process using port 4000
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or change port in docker-compose.yml
# Change "4000:4000" to "4001:4000"
```

### Migrations failing
```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Or manually run migrations
npx prisma migrate deploy
```

---

## Environment Variables

### Backend .env
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"

# JWT Configuration
JWT_SECRET="your-secret-key-min-32-chars-recommended"

# Admin Account Auto-Creation
ADMIN_EMAIL="admin@courier.com"
ADMIN_PASSWORD="admin123456"

# Server Port
PORT=4000
```

### Frontend .env
```env
# API Configuration (optional)
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## Validation Rules

### Registration/Login
- Email: Valid format, unique
- Password: Minimum 6 characters
- Name: Minimum 2 characters
- Address: Minimum 5 characters

### Shipment
- Recipient Name: Minimum 2 characters
- Recipient Address: Minimum 5 characters
- Status: PENDING, IN_TRANSIT, DELIVERED, or CANCELLED

---

## Quick Start Summary

```bash
# 1. Backend
cd backend
cp .env.example .env
docker-compose up -d

docker-compose logs -f app

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev

```

---


## 👨‍💻 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Backend | Express.js | 5.2.1 |
| ORM | Prisma | 7.8.0 |
| Database | PostgreSQL | 15 |
| Auth | JWT | 9.0.2 |
| Password | bcryptjs | 2.4.3 |
| Frontend | React | 19.2.6 |
| State Mgmt | Redux Toolkit | 2.12.0 |
| Build | Vite | 8.0.12 |
| Styling | Tailwind CSS | 4.3.0 |
| HTTP Client | Axios | 1.16.1 |
| Language | TypeScript | 6.x |

---