/**
 * Generates a unique patient ID in the format WPD-XXXXXX
 * e.g.  WPD-K3F2A9
 */
export function generatePatientId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result  = ''
  const bytes = new Uint8Array(6)
  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < 6; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  bytes.forEach(b => (result += chars[b % chars.length]))
  return `WPD-${result}`
}

/** Format YYYY-MM-DD → "Jun 12, 2025" */
export function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Format HH:MM → "10:30 AM" */
export function fmtTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hr = parseInt(h, 10)
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
}

/** Today's date as YYYY-MM-DD */
export function todayISO() {
  return new Date().toISOString().split('T')[0]
}

// ── Real services pulled directly from waypointdentistry.com/services/ ──
export const SERVICES = [
  'Dental Exam',
  'Cleaning (Prophylaxis)',
  'Hygiene Therapy',
  'Digital X-Rays',
  'Tooth-Colored Filling',
  'Crown',
  'Bridge',
  'Extraction',
  'Partial or Full Dentures',
  'Night Guard',
  'Teeth Whitening',
  'Teledentistry Consultation',
  'Foundation Visit (New Patient)',
  'Other / Not Sure',
]

export const STATUSES = ['pending', 'verified', 'confirmed', 'cancelled']
