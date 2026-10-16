import AppointmentCard from "../components/AppointmentCard.jsx";

export default function HomePage({ appointments }) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="section-tag">Home Page</p>
        <h2>Hospital Appointment System</h2>
        <p>
          MedCare Plus helps manage doctors, patients, and hospital appointments
          in one simple interface.
        </p>
      </div>

      <div className="appointment-grid">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={`${appointment.patientName}-${appointment.date}-${appointment.timeSlot}`}
            patientName={appointment.patientName}
            doctorName={appointment.doctorName}
            date={appointment.date}
            timeSlot={appointment.timeSlot}
            status={appointment.status}
          />
        ))}
      </div>
    </section>
  );
}
