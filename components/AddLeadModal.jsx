import { useState } from 'react'
import { X, PlusCircle } from 'lucide-react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { generatePatientId, SERVICES, STATUSES, todayISO } from '../lib/utils'

const INIT = {
  name: '', email: '', phone: '', address: '',
  service: '', callDate: '', callTime: '',
  message: '', status: 'pending',
}

export default function AddLeadModal({ onClose, onAdded }) {
  const [form, setForm]       = useState(INIT)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleAdd() {
    if (!form.name.trim()) { alert('Name is required.'); return }

    setLoading(true)
    try {
      const pid = generatePatientId()
      const ref = await addDoc(collection(db, 'leads'), {
        patientId:   pid,
        name:        form.name.trim(),
        email:       form.email.trim(),
        phone:       form.phone.trim(),
        address:     form.address.trim(),
        service:     form.service,
        callDate:    form.callDate,
        callTime:    form.callTime,
        message:     form.message.trim(),
        status:      form.status,
        createdAt:   Timestamp.now(),
        createdDate: todayISO(),
      })
      onAdded({ id: ref.id, patientId: pid, ...form, createdDate: todayISO() })
      onClose()
    } catch (err) {
      console.error(err)
      alert('Failed to add lead. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hdr">
          <h3>Add New Lead</h3>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={15} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name <span className="req">*</span></label>
              <input type="text" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="1234 Main St, Arlington, VA" value={form.address} onChange={set('address')} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Service</label>
              <select value={form.service} onChange={set('service')}>
                <option value="">— Select —</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={set('status')}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Best Call Date</label>
              <input type="date" value={form.callDate} onChange={set('callDate')} />
            </div>
            <div className="form-group">
              <label>Best Call Time</label>
              <input type="time" value={form.callTime} onChange={set('callTime')} />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Internal notes…"
              style={{ minHeight: '75px' }}
              value={form.message}
              onChange={set('message')}
            />
          </div>

          <button className="btn-primary" onClick={handleAdd} disabled={loading}>
            {loading
              ? <><span className="spinner" /> Adding…</>
              : <><PlusCircle size={15} /> Add Lead</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
