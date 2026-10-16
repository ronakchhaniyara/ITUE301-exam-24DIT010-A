import { useEffect, useState } from "react";

const DOCTORS_API_URL = "http://localhost:5000/api/v1/doctors";

export default function DoctorsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const response = await fetch(DOCTORS_API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const result = await response.json();
        setData(result.data);
      } catch (requestError) {
        setError(requestError.message || "Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="section-tag">Doctors Page</p>
        <h2>Doctors</h2>
        <p>View doctors available at the MedCare Plus hospital.</p>
      </div>

      {loading && <p>Loading doctors...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <div className="doctor-list">
          {data.map((doctor) => (
            <article key={doctor.id || doctor.name} className="info-card">
              <h3>{doctor.name}</h3>
              <p>Specialisation: {doctor.specialisation}</p>
              <p>
                Availability: {doctor.available ? "Available" : "Not Available"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
