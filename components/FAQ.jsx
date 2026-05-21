import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What areas do you serve?',
    a: 'We serve the Washington DC metropolitan region, including Northern Virginia (Arlington, Alexandria, McLean) and Maryland (Bethesda, Silver Spring, Rockville, and more). Contact us to confirm your exact location.',
  },
  {
    q: 'What equipment do you bring?',
    a: 'We bring a portable dental chair, digital X-ray system, intraoral camera, and all instruments needed for exams, cleanings, fillings, and more. Setup is clean and contained — your home is left exactly as we found it.',
  },
  {
    q: 'How long does a typical visit take?',
    a: 'Foundation Visits (exam + X-rays) take roughly 60–90 minutes. Routine cleanings are around 45–60 minutes. More complex procedures may take longer — we'll give you a clear time estimate during your confirmation call.',
  },
  {
    q: 'Do you accept dental insurance?',
    a: 'We work with several insurance plans and can provide superbills for out-of-network reimbursement. Financing options are also available. Contact us before booking to discuss your specific plan.',
  },
  {
    q: 'Is mobile dentistry right for seniors?',
    a: 'Yes — mobile dentistry is ideal for seniors with mobility challenges, assisted living residents, or anyone who finds travel difficult. Dr. Obadiaru has extensive experience providing compassionate, gentle care to elderly patients.',
  },
  {
    q: 'What is the on-site service fee?',
    a: 'The on-site fee covers travel and setup and varies based on your location. It is separate from the cost of treatment. We will confirm the exact fee before scheduling your visit, so there are no surprises.',
  },
  {
    q: 'Can I book on behalf of a family member?',
    a: 'Absolutely. Caregivers and family members are welcome to submit a request on behalf of a loved one. Just include their name and address in the form and mention in your notes that you\'re arranging care for someone else.',
  },
  {
    q: 'What is the Foundation Visit?',
    a: 'The Foundation Visit is our recommended first appointment for new patients. It includes a comprehensive exam, digital X-rays, intraoral photos, a clinical diagnosis, and a personalized care plan — plus a complimentary follow-up telehealth consultation.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(prev => prev === i ? null : i)

  return (
    <section className="faq-section">
      <div className="sec-heading">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know before your first visit.</p>
      </div>

      <div className="faq-grid">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${open === i ? 'open' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className="faq-q">
              <span>{item.q}</span>
              <ChevronDown size={17} className="faq-chevron" />
            </div>
            <div className="faq-ans">
              <div className="faq-ans-inner">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
