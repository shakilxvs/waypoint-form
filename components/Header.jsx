import { ArrowLeft } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <a
        href="https://waypointdentistry.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="logo-link"
      >
        <img
          src="https://waypointdentistry.com/wp-content/uploads/2026/03/waypoint-logo.png"
          alt="Waypoint Dentistry"
          className="logo-img"
        />
        <div className="logo-text">
          <span className="logo-name">Waypoint Dentistry</span>
          <span className="logo-tag">Mobile Dental Care · Washington DC</span>
        </div>
      </a>

      <nav className="header-nav">
        <a
          href="https://waypointdentistry.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          <ArrowLeft size={13} />
          Main Site
        </a>
      </nav>
    </header>
  )
}
