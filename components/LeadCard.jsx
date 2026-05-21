import { Phone, MessageSquare, Mail, MapPin, Stethoscope, Clock,
         CheckCircle2, XCircle, BadgeCheck, Trash2 } from 'lucide-react'
import { fmtDate, fmtTime, STATUSES } from '../lib/utils'

const STATUS_ICONS = {
  pending:   <Clock size={9} />,
  verified:  <BadgeCheck size={9} />,
  confirmed: <CheckCircle2 size={9} />,
  cancelled: <XCircle size={9} />,
}

export default function LeadCard({ lead, onStatusChange, onDelete }) {
  const hp = !!lead.phone
  const he = !!lead.email
  const ct = lead.callDate && lead.callTime
    ? `${fmtDate(lead.callDate)} at ${fmtTime(lead.callTime)}`
    : lead.callDate ? fmtDate(lead.callDate) : ''

  return (
    <div className="lead-card">
      {/* ── TOP ── */}
      <div className="lc-top">
        <div className="lc-meta">
          <div>
            <div className="lead-pid">{lead.patientId}</div>
            <div className="lead-name">{lead.name}</div>
            <div className="lead-date">Received {fmtDate(lead.createdDate || '')}</div>
          </div>
          <span className={`sbadge ${lead.status}`}>
            {STATUS_ICONS[lead.status]}
            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
          </span>
        </div>

        <div className="lc-info">
          {hp && (
            <div className="lc-row">
              <Phone size={11} />
              {lead.phone}
            </div>
          )}
          {he && (
            <div className="lc-row">
              <Mail size={11} />
              {lead.email}
            </div>
          )}
          <div className="lc-row">
            <MapPin size={11} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
              {lead.address || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="lc-body">
        {lead.service && (
          <div className="svc-tag">
            <Stethoscope size={11} />
            {lead.service}
          </div>
        )}

        {lead.message && (
          <div className="lead-msg">{lead.message}</div>
        )}

        {ct && (
          <div className="call-time">
            <Clock size={11} />
            Best time: {ct}
          </div>
        )}

        {/* Action buttons */}
        <div className="act-row">
          {hp ? (
            <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="act-btn call">
              <Phone size={12} /> Call
            </a>
          ) : (
            <span className="act-btn call disabled"><Phone size={12} /> Call</span>
          )}
          {hp ? (
            <a href={`sms:${lead.phone.replace(/\D/g, '')}`} className="act-btn sms">
              <MessageSquare size={12} /> Text
            </a>
          ) : (
            <span className="act-btn sms disabled"><MessageSquare size={12} /> Text</span>
          )}
          {he ? (
            <a href={`mailto:${lead.email}`} className="act-btn mail">
              <Mail size={12} /> Email
            </a>
          ) : (
            <span className="act-btn mail disabled"><Mail size={12} /> Email</span>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="lc-foot">
        <select
          className="st-select"
          value={lead.status}
          onChange={e => onStatusChange(lead.id, e.target.value)}
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <button
          className="btn-del"
          title="Remove lead"
          onClick={() => onDelete(lead.id, lead.patientId)}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}
