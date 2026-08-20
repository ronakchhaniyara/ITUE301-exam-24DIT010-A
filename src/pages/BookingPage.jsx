export default function BookingPage() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="section-tag">Booking Page</p>
        <h2>Book an Appointment</h2>
        <p>
          This page shows the basic booking interface structure for Task 1.
        </p>
      </div>

      <section className="info-card booking-layout">
        <div className="booking-field">
          <label htmlFor="patientName">Patient Name</label>
          <input
            id="patientName"
            type="text"
            placeholder="Enter patient name"
            readOnly
          />
        </div>

        <div className="booking-field">
          <label htmlFor="doctorName">Doctor Name</label>
          <input
            id="doctorName"
            type="text"
            placeholder="Select doctor name"
            readOnly
          />
        </div>

        <div className="booking-field">
          <label htmlFor="appointmentDate">Date</label>
          <input id="appointmentDate" type="text" placeholder="Choose date" readOnly />
        </div>

        <div className="booking-field">
          <label htmlFor="timeSlot">Time Slot</label>
          <input id="timeSlot" type="text" placeholder="Choose time slot" readOnly />
        </div>
      </section>
    </section>
  );
}
