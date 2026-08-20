const express = require("express");

const app = express();
const PORT = 5000;

const doctors = [
  {
    id: "D001",
    name: "Dr. Amit Patel",
    email: "amit@example.com",
    specialisation: "Cardiologist",
    available: true
  },
  {
    id: "D002",
    name: "Dr. Neha Shah",
    email: "neha@example.com",
    specialisation: "Dermatologist",
    available: true
  },
  {
    id: "D003",
    name: "Dr. Riya Mehta",
    email: "riya@example.com",
    specialisation: "Pediatrician",
    available: false
  }
];

const appointments = [
  {
    id: "A001",
    patientId: "P001",
    doctorId: "D001",
    date: "2026-08-25",
    timeSlot: "10:00 AM - 10:30 AM",
    status: "confirmed",
    reason: "Regular checkup"
  },
  {
    id: "A002",
    patientId: "P002",
    doctorId: "D002",
    date: "2026-08-26",
    timeSlot: "11:30 AM - 12:00 PM",
    status: "pending",
    reason: "Skin consultation"
  }
];

// Logs every request before it reaches the route handlers.
function requestLogger(req, res, next) {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
}

app.use(requestLogger);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

app.get("/api/v1/appointments", (req, res) => {
  res.status(200).json({
    success: true,
    data: appointments
  });
});

app.post("/api/v1/appointments", (req, res, next) => {
  try {
    const { patientId, doctorId, date, timeSlot, status, reason } = req.body;

    if (!patientId || !doctorId || !date || !timeSlot || !reason) {
      return res.status(400).json({
        success: false,
        message: "patientId, doctorId, date, timeSlot and reason are required"
      });
    }

    const newAppointment = {
      id: `A${String(appointments.length + 1).padStart(3, "0")}`,
      patientId,
      doctorId,
      date,
      timeSlot,
      status: status || "pending",
      reason
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/doctors", (req, res) => {
  res.status(200).json({
    success: true,
    data: doctors
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Handles unhandled server errors without exposing internal stack traces.
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
