import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import DoctorsPage from "./pages/DoctorsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";

export default function App() {
  const sampleAppointments = [
    {
      patientName: "Rahul Patel",
      doctorName: "Dr. Mehta",
      date: "2026-08-25",
      timeSlot: "10:00 AM - 10:30 AM",
      status: "confirmed"
    },
    {
      patientName: "Anita Shah",
      doctorName: "Dr. Amit Patel",
      date: "2026-08-26",
      timeSlot: "11:30 AM - 12:00 PM",
      status: "pending"
    },
    {
      patientName: "Vikram Joshi",
      doctorName: "Dr. Neha Shah",
      date: "2026-08-27",
      timeSlot: "02:00 PM - 02:30 PM",
      status: "cancelled"
    }
  ];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-header__tag">MedCare Plus</p>
          <h1>Hospital Appointment System</h1>
        </div>
        <p className="app-header__text">
          Task 1 frontend component architecture using React components and
          props.
        </p>
      </header>

      <main className="app-main">
        <HomePage appointments={sampleAppointments} />
        <DoctorsPage />
        <BookingPage />
      </main>
    </div>
  );
}
