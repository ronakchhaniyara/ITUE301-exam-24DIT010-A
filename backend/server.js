const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Mongoose models (Task 5)
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// In-memory data for Task 3
// ---------------------------------------------------------------------------
const doctorsList = [
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

const appointmentsList = [
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

// ---------------------------------------------------------------------------
// Custom requestLogger middleware (Task 3)
// Logs: [METHOD] [PATH] [TIMESTAMP]
// ---------------------------------------------------------------------------
function requestLogger(req, res, next) {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
}

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// ===========================================================================
// Task 3 — In-memory REST endpoints
// ===========================================================================

// GET all appointments
app.get("/api/v1/appointments", (req, res) => {
  res.status(200).json({
    success: true,
    data: appointmentsList
  });
});

// POST a new appointment
app.post("/api/v1/appointments", (req, res, next) => {
  try {
    const { patientId, doctorId, date, timeSlot, status, reason } = req.body;

    if (!patientId || !doctorId || !date || !timeSlot || !reason) {
      return res.status(400).json({
        success: false,
        message: "patientId, doctorId, date, timeSlot and reason are required"
      });
    }

    const validStatuses = ["pending", "confirmed", "cancelled"];
    const appointmentStatus = status || "pending";

    if (!validStatuses.includes(appointmentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      });
    }

    const newAppointment = {
      id: `A${String(appointmentsList.length + 1).padStart(3, "0")}`,
      patientId,
      doctorId,
      date,
      timeSlot,
      status: appointmentStatus,
      reason
    };

    appointmentsList.push(newAppointment);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment
    });
  } catch (error) {
    next(error);
  }
});

// GET all doctors
app.get("/api/v1/doctors", (req, res) => {
  res.status(200).json({
    success: true,
    data: doctorsList
  });
});

// ===========================================================================
// Task 5 — MongoDB / Mongoose endpoints
// ===========================================================================

// Health check
app.get("/api/v1/task5/health", (req, res) => {
  res.status(200).json({
    success: true,
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Create a patient
app.post("/api/v1/task5/patients", async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
});

// Get all patients
app.get("/api/v1/task5/patients", async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
});

// Create a doctor
app.post("/api/v1/task5/doctors", async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
});

// Get all doctors (MongoDB)
app.get("/api/v1/task5/doctors", async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    next(error);
  }
});

// Create an appointment
app.post("/api/v1/task5/appointments", async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    const populatedAppointment = await appointment.populate([
      { path: "patientId", select: "name email" },
      { path: "doctorId", select: "name specialisation" }
    ]);

    res.status(201).json({ success: true, data: populatedAppointment });
  } catch (error) {
    next(error);
  }
});

// Get all appointments (MongoDB)
app.get("/api/v1/task5/appointments", async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialisation");
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
});

// ===========================================================================
// 404 handler
// ===========================================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ===========================================================================
// Global error-handling middleware (Task 3)
// Returns structured JSON instead of exposing the raw error stack.
// ===========================================================================
app.use((err, req, res, next) => {
  // Mongoose duplicate key error (e.g., unique email)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value. A record with that unique field already exists."
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const fields = {};
    for (const field in err.errors) {
      fields[field] = err.errors[field].message;
    }
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      fields
    });
  }

  // Mongoose cast error (invalid ObjectId etc.)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for ${err.path}.`
    });
  }

  // Generic server error
  console.error("Server error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ===========================================================================
// Start server — connect to MongoDB if MONGO_URI is available
// ===========================================================================
async function startServer() {
  // Connect to MongoDB if URI is provided
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.log("Server will start without MongoDB (Task 3 APIs still work)");
    }
  } else {
    console.log(
      "MONGO_URI not set. Task 3 in-memory APIs are available. Task 5 MongoDB endpoints require MONGO_URI in .env"
    );
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\n[ERROR] Port ${PORT} is already in use by another process.`);
      console.error(`Tip: Stop any running node process on port ${PORT} or change PORT in .env\n`);
      process.exit(1);
    } else {
      console.error("Server error:", err.message);
    }
  });
}

startServer();
