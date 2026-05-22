import { useState } from 'react'
import { Send, Lock, ShieldCheck } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { generatePatientId, SERVICES, todayISO } from '../lib/utils'

const INIT = {
  name: '', email: '', phone: '', address: '',
  service: '', callDate: '', callTime: '', message: '',
}

export default function BookingForm() {
  const [form,       setForm]       = useState(INIT)
  const [errors,     setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [patientId,  setPatientId]  = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  function validate() {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Full name is required'
    if (!form.phone.trim())   errs.phone   = 'Phone number is required'
    if (!form.address.trim()) errs.address = 'Service address is required'
    if (!form.service)        errs.service = 'Please select a service'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const pid   = generatePatientId()
    const today = todayISO()

    // ── Step 1: Firestore (critical — if this fails, we stop and show error) ──
    try {
      await addDoc(collection(db, 'leads'), {
        patientId:   pid,
        name:        form.name.trim(),
        email:       form.email.trim(),
        phone:       form.phone.trim(),
        address:     form.address.trim(),
        service:     form.service,
        callDate:    form.callDate,
        callTime:    form.callTime,
        message:     form.message.trim(),
        status:      'pending',
        createdAt:   Timestamp.now(),
        createdDate: today,
      })
    } catch (firestoreErr) {
      console.error('Firestore error:', firestoreErr)
      alert('Something went wrong saving your request. Please try again or call us directly.')
      setSubmitting(false)
      return
    }

    // ── Step 2: EmailJS — best-effort, never blocks success ──
    if (form.email.trim()) {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            to_name:    form.name.trim(),
            to_email:   form.email.trim(),
            patient_id: pid,
            service:    form.service,
            call_date:  form.callDate || 'To be confirmed',
            call_time:  form.callTime || 'To be confirmed',
            message:    form.message  || 'No additional notes',
            reply_to:   'admin@waypointdentistry.com',
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        console.log('EmailJS: confirmation sent to', form.email.trim())
      } catch (emailErr) {
        // Log but never show an error — lead is already saved
        console.error('EmailJS error (non-critical):', emailErr)
      }
    }

    // ── Step 3: Formspree — best-effort, never blocks success ──
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          patient_id: pid,
          name:       form.name.trim(),
          email:      form.email.trim() || '—',
          phone:      form.phone.trim(),
          address:    form.address.trim(),
          service:    form.service,
          call_date:  form.callDate || '—',
          call_time:  form.callTime || '—',
          message:    form.message.trim() || '—',
        }),
      })
      if (!res.ok) {
        const body = await res.text()
        console.error('Formspree non-OK response:', res.status, body)
      } else {
        console.log('Formspree: admin notification sent')
      }
    } catch (formspreeErr) {
      // Log but never show an error — lead is already saved
      console.error('Formspree error (non-critical):', formspreeErr)
    }

    // ── Always show success once Firestore saved ──
    setPatientId(pid)
    setSubmitted(true)
    setSubmitting(false)
  }

  function handleReset() {
    setForm(INIT)
    setErrors({})
    setSubmitted(false)
    setPatientId('')
  }

  const FieldError = ({ k }) =>
    errors[k]
      ? <span className="field-hint" style={{ color: '#CC4444', marginTop: 3 }}>⚠ {errors[k]}</span>
      : null

  // ── SUCCESS STATE ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="form-card">
        <div className="success-card">
          <div className="success-icon">
            <ShieldCheck size={34} />
          </div>
          <h2>Request Received!</h2>
          <div className="success-pid">{patientId}</div>
          <p>
            Thank you, <strong>{form.name.split(' ')[0]}</strong>. A member of our team will
            review your request and contact you within 24 hours to confirm your in-home visit.
            {form.email && <> A confirmation email is on its way to <strong>{form.email}</strong>.</>}
          </p>
          <button className="btn-reset" onClick={handleReset}>
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  // ── FORM ──────────────────────────────────────────────────────
  return (
    <div className="form-card">
      <div className="form-card-head">
        <h2>Request a Visit</h2>
        <p>Fill in your details — we'll be in touch within 24 hours.</p>
      </div>

      <form className="form-body" onSubmit={handleSubmit} noValidate>

        {/* ── Personal ── */}
        <div className="sec-label">Personal Information</div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="f-name">Full Name <span className="req">*</span></label>
            <input
              id="f-name" type="text" placeholder="Jane Doe"
              value={form.name} onChange={set('name')}
              style={errors.name ? { borderColor: '#CC4444' } : {}}
            />
            <FieldError k="name" />
          </div>
          <div className="form-group">
            <label htmlFor="f-phone">Phone Number <span className="req">*</span></label>
            <input
              id="f-phone" type="tel" placeholder="(555) 000-0000"
              value={form.phone} onChange={set('phone')}
              style={errors.phone ? { borderColor: '#CC4444' } : {}}
            />
            <FieldError k="phone" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="f-email">Email Address</label>
          <input
            id="f-email" type="email" placeholder="jane@example.com"
            value={form.email} onChange={set('email')}
          />
          <span className="field-hint">Optional — we'll send a confirmation if provided.</span>
        </div>

        <div className="form-group">
          <label htmlFor="f-address">Home / Service Address <span className="req">*</span></label>
          <input
            id="f-address" type="text"
            placeholder="1234 Oak St, Arlington, VA 22201"
            value={form.address} onChange={set('address')}
            style={errors.address ? { borderColor: '#CC4444' } : {}}
          />
          <span className="field-hint">We serve the Washington DC metro area — MD &amp; Northern Virginia.</span>
          <FieldError k="address" />
        </div>

        <hr className="form-divider" />

        {/* ── Visit Details ── */}
        <div className="sec-label">Visit Details</div>

        <div className="form-group">
          <label htmlFor="f-service">Preferred Service <span className="req">*</span></label>
          <select
            id="f-service" value={form.service} onChange={set('service')}
            style={errors.service ? { borderColor: '#CC4444' } : {}}
          >
            <option value="">— Select a service —</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <FieldError k="service" />
        </div>

        <div className="form-group">
          <label>Best Time to Call</label>
          <div className="time-row">
            <input
              type="date" value={form.callDate}
              onChange={set('callDate')} min={todayISO()}
            />
            <input
              type="time" value={form.callTime}
              onChange={set('callTime')}
            />
          </div>
          <span className="field-hint">Evenings &amp; weekends available. We'll do our best to call then.</span>
        </div>

        <hr className="form-divider" />

        {/* ── Notes ── */}
        <div className="sec-label">Anything to Add?</div>

        <div className="form-group">
          <label htmlFor="f-message">Message or Special Notes</label>
          <textarea
            id="f-message"
            placeholder="E.g. I have dental anxiety, I'm booking for a parent in assisted living, I live in an apartment building…"
            value={form.message} onChange={set('message')}
          />
          <span className="field-hint">Optional — the more you share, the better we can prepare.</span>
        </div>

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting
            ? <><span className="spinner" /> Sending…</>
            : <><Send size={15} /> Send My Request</>
          }
        </button>

        <p className="form-foot">
          <Lock size={11} />
          &nbsp;Your information is kept private and never shared.
          By submitting, you agree to be contacted by Waypoint Dentistry.
        </p>
      </form>
    </div>
  )
}
