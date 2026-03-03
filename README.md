# BMR Pharmacy Sales Tracker

A full-stack web application for tracking pharmacy sales, managing product inventory summaries, and generating monthly revenue reports. Built for internal use at BMR Pharmacy.

---

## Live Demo

- Frontend: https://xndrncp08-bmr-pharmacy.vercel.app
- Backend API: https://bmr-pharmacy-1.onrender.com/api/health

---

## What It Does

BMR Pharmacy Sales Tracker allows pharmacy staff to:

- Record medicine sales with category classification
- View a live dashboard with today's revenue, transaction count, and a 7-day sales chart
- Browse and search the complete sales history with date range filtering
- Edit or delete existing sale records, with automatic product summary updates
- View a ranked product summary showing total sold, total revenue, and last sold date per medicine
- Generate monthly summaries with category breakdowns, top 5 medicines by revenue, daily charts, and month-over-month comparisons

All data is stored in a PostgreSQL database hosted on Supabase. The frontend communicates exclusively through a Node.js/Express backend API — it never connects directly to the database.

---

## Tech Stack

**Frontend**
- React 19 with Vite
- Tailwind CSS v3
- Recharts for data visualization
- Axios for API communication
- React Router v6

**Backend**
- Node.js with Express 5
- Supabase JS client
- dotenv, cors, nodemon

**Database**
- Supabase (PostgreSQL)

**Hosting**
- Frontend: Vercel
- Backend: Render
- Database: Supabase

---

## Local Setup Guide

### Prerequisites

- Node.js v18 or higher
- A Supabase account and project
- Git

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/xndrncp08/bmr-pharmacy.git
cd bmr-pharmacy
```

---

### Step 2 — Configure the backend

```bash
cd backend
```

Create a `.env` file:

```env
PORT=5000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-anon-public-key
```

Install dependencies:

```bash
npm install
```

---

### Step 3 — Configure the frontend

```bash
cd ../frontend
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Install dependencies:

```bash
npm install
```

---

### Step 4 — Run the application

Open two terminal windows.

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

The API will start at `http://localhost:5000`

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

The app will open at `http://localhost:5173`

---

### Step 5 — Verify the setup

Open your browser and navigate to `http://localhost:5173`. You should see the Dashboard page. To confirm the API is running, visit `http://localhost:5000/api/health`


## Notes

- Never commit your `.env` files. They are excluded via `.gitignore`.
- Never use the Supabase `service_role` key in this application. Always use the `anon/public` key.
- The frontend does not connect to Supabase directly. All database operations go through the Express backend.
- The Render free tier spins down after 15 minutes of inactivity. The first request after inactivity may take up to 30 seconds while the service wakes up.