require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();
const PORT = process.env.MONGO_SERVER_PORT || 5001;

app.use(express.json());

app.get("/api/v1/task5/health", (req, res) => {
  res.json({
    success: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.post("/api/v1/task5/patients", async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/task5/doctors", async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
});

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

app.use((error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A patient with that email already exists."
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      fields: Object.fromEntries(
        Object.entries(error.errors).map(([field, fieldError]) => [
          field,
          fieldError.message
        ])
      )
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for ${error.path}.`
    });
  }

  console.error("Task 5 server error:", error.message);
  res.status(500).json({
    success: false,
    message: "Unable to process the request."
  });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Task 5 MongoDB server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error(`Task 5 startup failed: ${error.message}`);
  process.exit(1);
});
