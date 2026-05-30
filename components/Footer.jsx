export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <img
          src="https://waypointdentistry.com/wp-content/uploads/2026/03/waypoint-logo.png"
          alt="Waypoint Dentistry"
        />
      </div>

      <p>
        © {new Date().getFullYear()} Waypoint Mobile Dentistry
        &nbsp;·&nbsp;
        <a href="https://waypointdentistry.com/" target="_blank" rel="noopener noreferrer">
          waypointdentistry.com
        </a>
        &nbsp;·&nbsp;Maryland
      </p>

      <div className="footer-divider" />

      <p>
        This form is for appointment requests only.
        For dental emergencies, please call us directly.
      </p>
    </footer>
  )
}
