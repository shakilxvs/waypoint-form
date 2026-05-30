import {
  Phone, MessageSquare, Mail,
  ClipboardList, PhoneCall, CalendarCheck, ExternalLink,
} from 'lucide-react'

// Real contact info from waypointdentistry.com
const PHONE     = '(301) 709-7578'
const PHONE_TEL = '+13017097578'
const EMAIL     = 'admin@waypointdentistry.com'

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* ── Direct Contact ── */}
      <div className="s-card">
        <h3>Prefer to reach us first?</h3>
        <p>Our team is available by phone, text, or email — happy to answer questions before you connect.</p>
        <div className="contact-btns">
          <a href={`tel:${PHONE_TEL}`} className="cta-btn call">
            <Phone size={15} /> Call {PHONE}
          </a>
          <a href={`sms:${PHONE_TEL}`} className="cta-btn sms">
            <MessageSquare size={15} /> Send a Text
          </a>
          <a href={`mailto:${EMAIL}`} className="cta-btn mail">
            <Mail size={15} /> Email Us
          </a>
        </div>
      </div>

      {/* ── What to Expect ── */}
      <div className="s-card">
        <h3>What to Expect</h3>
        <div className="steps">
          <div className="step">
            <div className="step-dot"><ClipboardList size={13} /></div>
            <div>
              <div className="step-title">We review your request</div>
              <div className="step-desc">Every submission is reviewed by our team within 24 hours.</div>
            </div>
          </div>
          <div className="step">
            <div className="step-dot"><PhoneCall size={13} /></div>
            <div>
              <div className="step-title">We call you</div>
              <div className="step-desc">We confirm your service, answer questions, and arrange your visit.</div>
            </div>
          </div>
          <div className="step">
            <div className="step-dot"><CalendarCheck size={13} /></div>
            <div>
              <div className="step-title">Your visit is confirmed</div>
              <div className="step-desc">In-person or virtual appointment scheduled at a time that works for you.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Helpful Links ── */}
      <div className="s-card">
        <h3>Helpful Links</h3>
        <div className="links-list">
          {[
            ['Our Services',         'https://waypointdentistry.com/services/'],
            ['In-Person Services',   'https://waypointdentistry.com/in-person-services/'],
            ['Teledentistry',        'https://waypointdentistry.com/teledentistry/'],
            ['Areas We Serve',       'https://waypointdentistry.com/areas-we-serve/'],
            ['New Patient Forms',    'https://waypointdentistry.com/new-patient-registration/'],
            ['Meet Dr. Obadiaru',    'https://waypointdentistry.com/meet-dr-obadiaru/'],
            ['FAQs',                 'https://waypointdentistry.com/faq/'],
            ['Contact Page',         'https://waypointdentistry.com/contact-2/'],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="site-link">
              <span>{label}</span>
              <span className="sl-icon"><ExternalLink size={12} /></span>
            </a>
          ))}
        </div>
      </div>

    </aside>
  )
}
