export default function DoctorsPage() {
  const doctors = [
    { name: "Dr. Amit Patel", specialization: "Cardiologist" },
    { name: "Dr. Neha Shah", specialization: "Dermatologist" },
    { name: "Dr. Riya Mehta", specialization: "Pediatrician" }
  ];

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="section-tag">Doctors Page</p>
        <h2>Doctors</h2>
        <p>Sample doctor information for the MedCare Plus hospital system.</p>
      </div>

      <div className="doctor-list">
        {doctors.map((doctor) => (
          <article key={doctor.name} className="info-card">
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
