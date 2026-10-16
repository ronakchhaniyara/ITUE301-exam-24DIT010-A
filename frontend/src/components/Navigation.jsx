import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navigation__link navigation__link--active" : "navigation__link"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/doctors"
        className={({ isActive }) =>
          isActive ? "navigation__link navigation__link--active" : "navigation__link"
        }
      >
        Doctors
      </NavLink>
      <NavLink
        to="/booking"
        className={({ isActive }) =>
          isActive ? "navigation__link navigation__link--active" : "navigation__link"
        }
      >
        Book Appointment
      </NavLink>
    </nav>
  );
}
