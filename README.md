# Hospital Appointment System — MedCare Plus

A full-stack Hospital Appointment System built with **React**, **Express.js**, and **MongoDB/Mongoose** for the ITUE301 exam.

---

## Project Structure

```
itue301-exam-24DIT010-A/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentCard.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   └── BookingPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── server.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Backend Setup

```bash
cd backend
npm install
npm start
```

or

```bash
cd backend
node server.js
```

The backend runs at `http://localhost:5000`.

## MongoDB Setup

1. Install MongoDB Community Server locally, or create a MongoDB Atlas cluster.
2. Start the local MongoDB service (if using local MongoDB).
3. Copy the root `.env.example` file to `backend/.env`.
4. Set `MONGO_URI` in `backend/.env` to your connection string.
5. Start the server with `npm start` from `backend/`.
6. Confirm the connection at `http://localhost:5000/api/v1/task5/health`.

> **Note:** The server starts even without `MONGO_URI`. Task 3 in-memory APIs (`/api/v1/doctors`, `/api/v1/appointments`) work without MongoDB. Task 5 endpoints (`/api/v1/task5/*`) require a valid `MONGO_URI`.

## Required Environment Variables

Create `backend/.env` with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hospital_appointment_system
PORT=5000
```

| Variable    | Required | Description                          |
|-------------|----------|--------------------------------------|
| `MONGO_URI` | Yes*     | MongoDB connection string            |
| `PORT`      | No       | Backend port (defaults to `5000`)    |

*Required only for Task 5 MongoDB endpoints.

## API Endpoints

### Task 3 — In-Memory APIs

| Method | Endpoint               | Purpose                 |
|--------|------------------------|-------------------------|
| GET    | `/api/v1/doctors`      | Return all doctors      |
| GET    | `/api/v1/appointments` | Return all appointments |
| POST   | `/api/v1/appointments` | Create a new appointment|

### Task 5 — MongoDB APIs

| Method | Endpoint                       | Purpose                  |
|--------|--------------------------------|--------------------------|
| GET    | `/api/v1/task5/health`         | Database health check    |
| POST   | `/api/v1/task5/patients`       | Create a patient         |
| GET    | `/api/v1/task5/patients`       | Get all patients         |
| POST   | `/api/v1/task5/doctors`        | Create a doctor          |
| GET    | `/api/v1/task5/doctors`        | Get all doctors          |
| POST   | `/api/v1/task5/appointments`   | Create an appointment    |
| GET    | `/api/v1/task5/appointments`   | Get all appointments     |

## Task 5 — Demonstration

### Create a Patient

```http
POST http://localhost:5000/api/v1/task5/patients
Content-Type: application/json

{
  "name": "Anita Shah",
  "email": "anita@example.com",
  "phone": "9876543210",
  "bloodGroup": "A+",
  "age": 30
}
```

### Validation Failure — Invalid Blood Group

```http
POST http://localhost:5000/api/v1/task5/patients
Content-Type: application/json

{
  "name": "Test Patient",
  "email": "test@example.com",
  "bloodGroup": "C+"
}
```

Returns:
```json
{
  "success": false,
  "message": "Validation failed.",
  "fields": {
    "bloodGroup": "`C+` is not a valid enum value for path `bloodGroup`."
  }
}
```

### Validation Failure — Missing Required Field

```http
POST http://localhost:5000/api/v1/task5/patients
Content-Type: application/json

{
  "email": "noname@example.com"
}
```

Returns:
```json
{
  "success": false,
  "message": "Validation failed.",
  "fields": {
    "name": "Path `name` is required."
  }
}
```

### Validation Failure — Reason Exceeding 300 Characters

```http
POST http://localhost:5000/api/v1/task5/appointments
Content-Type: application/json

{
  "patientId": "<valid_patient_id>",
  "doctorId": "<valid_doctor_id>",
  "date": "2026-09-01",
  "timeSlot": "09:00 AM - 09:30 AM",
  "reason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
}
```

### Validation Failure — Invalid Appointment Status

```http
POST http://localhost:5000/api/v1/task5/appointments
Content-Type: application/json

{
  "patientId": "<valid_patient_id>",
  "doctorId": "<valid_doctor_id>",
  "date": "2026-09-01",
  "timeSlot": "09:00 AM - 09:30 AM",
  "status": "approved"
}
```

Returns a validation error because `approved` is not a valid status.
