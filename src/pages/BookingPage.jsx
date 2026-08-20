import { useState } from "react";

export default function BookingPage() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="section-tag">Booking Page</p>
        <h2>Book an Appointment</h2>
        <p>
          Enter appointment details below. The selected values update
          immediately using React state.
        </p>
      </div>

      <form className="info-card booking-form" onSubmit={handleSubmit}>
        <div className="booking-layout">
          <div className="booking-field">
            <label htmlFor="patientName">Patient Name</label>
            <input
              id="patientName"
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="doctorName">Doctor Name</label>
            <select
              id="doctorName"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
            >
              <option value="">Select doctor</option>
              <option value="Dr. Amit Patel">Dr. Amit Patel</option>
              <option value="Dr. Neha Shah">Dr. Neha Shah</option>
              <option value="Dr. Riya Mehta">Dr. Riya Mehta</option>
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="appointmentDate">Date</label>
            <input
              id="appointmentDate"
              type="date"
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="timeSlot">Time Slot</label>
            <select
              id="timeSlot"
              value={timeSlot}
              onChange={(event) => setTimeSlot(event.target.value)}
            >
              <option value="">Select time slot</option>
              <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
              <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
              <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
              <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
            </select>
          </div>
        </div>

        <div className="booking-actions">
          <button type="submit" className="primary-button">
            Book Appointment
          </button>
        </div>

        <div className="booking-summary">
          <p>
            <strong>Current Patient:</strong> {patientName || "Not entered"}
          </p>
          <p>
            <strong>Selected Doctor:</strong> {doctorName || "Not selected"}
          </p>
          <p>
            <strong>Selected Date:</strong> {appointmentDate || "Not selected"}
          </p>
          <p>
            <strong>Selected Time Slot:</strong> {timeSlot || "Not selected"}
          </p>
        </div>
      </form>
    </section>
  );
}
