export default function AppointmentCard({
  patientName,
  doctorName,
  date,
  timeSlot,
  status
}) {
  const statusClassName = `status-badge status-${status}`;

  return (
    <article className="appointment-card">
      <h3 className="appointment-card__title">Appointment Details</h3>
      <div className="appointment-card__content">
        <p>
          <strong>Patient Name:</strong> {patientName}
        </p>
        <p>
          <strong>Doctor Name:</strong> {doctorName}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time Slot:</strong> {timeSlot}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={statusClassName}>{status}</span>
        </p>
      </div>
    </article>
  );
}
