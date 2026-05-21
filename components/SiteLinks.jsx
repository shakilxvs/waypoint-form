import {
  Stethoscope, UserRound, Map, Info,
  CreditCard, FileText, Video, Phone,
  Users, HeartPulse,
} from 'lucide-react'

const LINKS = [
  { icon: Stethoscope, label: 'Services',           href: 'https://waypointdentistry.com/services/' },
  { icon: HeartPulse,  label: 'In-Person Services', href: 'https://waypointdentistry.com/in-person-services/' },
  { icon: Video,       label: 'Teledentistry',       href: 'https://waypointdentistry.com/teledentistry/' },
  { icon: UserRound,   label: 'Meet the Doctor',    href: 'https://waypointdentistry.com/meet-dr-obadiaru/' },
  { icon: Map,         label: 'Areas Served',        href: 'https://waypointdentistry.com/areas-we-serve/' },
  { icon: Info,        label: 'How It Works',        href: 'https://waypointdentistry.com/how-it-works-patients/' },
  { icon: Users,       label: 'Caregivers & Families', href: 'https://waypointdentistry.com/caregivers-families/' },
  { icon: CreditCard,  label: 'Payment & Financing', href: 'https://waypointdentistry.com/payment/' },
  { icon: FileText,    label: 'New Patient Forms',   href: 'https://waypointdentistry.com/new-patient-registration/' },
  { icon: Phone,       label: 'Contact Us',          href: 'https://waypointdentistry.com/contact-2/' },
]

export default function SiteLinks() {
  return (
    <section className="ql-section">
      <div className="sec-heading">
        <h2>Explore More</h2>
        <p>Visit our main website to learn more about our care.</p>
      </div>

      <div className="ql-grid">
        {LINKS.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ql-card"
          >
            <div className="ql-icon">
              <Icon size={20} />
            </div>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
