# Hospital Appointment System

This project contains the React hospital appointment frontend, the Task 3 Express API, and a separate Task 5 MongoDB/Mongoose implementation.

## Frontend Setup

From the project root:

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Backend Setup

The existing Task 3 API remains available with:

```bash
cd backend
npm install
npm start
```

It runs at `http://localhost:5000`.

The separate Task 5 MongoDB server runs with:

```bash
cd backend
npm run start:task5
```

It runs at `http://localhost:5001`.

## MongoDB Setup

1. Install MongoDB Community Server, or create a MongoDB Atlas cluster.
2. Start the local MongoDB service, if using MongoDB locally.
3. Copy the root `.env.example` file to `backend/.env`.
4. Set `MONGO_URI` in `backend/.env` to your local or Atlas connection string.
5. Start the Task 5 server with `npm run start:task5` from `backend`.
6. Confirm the connection at `http://localhost:5001/api/v1/task5/health`.

## Environment Variables

Required in `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_appointment_system
MONGO_SERVER_PORT=5001
```

`MONGO_URI` is required. `MONGO_SERVER_PORT` is optional and defaults to `5001`.

## Task 5 Demonstration Endpoints

Create a patient:

```http
POST http://localhost:5001/api/v1/task5/patients
Content-Type: application/json

{
  "name": "Anita Shah",
  "email": "anita@example.com",
  "phone": "9876543210",
  "bloodGroup": "A+",
  "age": 30
}
```

Create a doctor:

```http
POST http://localhost:5001/api/v1/task5/doctors
Content-Type: application/json

{
  "name": "Dr. Mehta",
  "email": "mehta@example.com",
  "specialisation": "Cardiologist"
}
```

Use the returned patient and doctor `_id` values to create an appointment at `/api/v1/task5/appointments`. The appointment uses `pending` by default and populates the Patient and Doctor references in the response.

Invalid blood groups, missing required fields, invalid appointment statuses, and reasons longer than 300 characters return a meaningful validation response without exposing the raw Mongoose error.
