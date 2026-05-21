import { useState, useEffect, useCallback } from 'react'
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { MapPin, LogOut, Search, Plus, Inbox } from 'lucide-react'
import { db } from '../lib/firebase'
import LeadCard from './LeadCard'
import AddLeadModal from './AddLeadModal'

const FILTER_LABELS = [
  { key: 'all',       label: 'All',       cls: '' },
  { key: 'pending',   label: 'Pending',   cls: 'f-pending' },
  { key: 'verified',  label: 'Verified',  cls: 'f-verified' },
  { key: 'confirmed', label: 'Confirmed', cls: 'f-confirmed' },
  { key: 'cancelled', label: 'Cancelled', cls: 'f-cancelled' },
]

export default function AdminDashboard({ onLogout }) {
  const [leads,       setLeads]       = useState([])
  const [filter,      setFilter]      = useState('all')
  const [search,      setSearch]      = useState('')
  const [showModal,   setShowModal]   = useState(false)
  const [toast,       setToast]       = useState(null)
  const [loading,     setLoading]     = useState(true)

  // Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, err => {
      console.error('Firestore error:', err)
      setLoading(false)
    })
    return unsub
  }, [])

  // Toast helper
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Stats
  const stats = {
    total:     leads.length,
    pending:   leads.filter(l => l.status === 'pending').length,
    confirmed: leads.filter(l => l.status === 'confirmed').length,
    cancelled: leads.filter(l => l.status === 'cancelled').length,
  }

  // Filtered + searched
  const visible = leads.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || [l.name, l.email, l.phone, l.address, l.patientId]
      .some(v => (v || '').toLowerCase().includes(q))
    return matchFilter && matchSearch
  })

  async function handleStatusChange(id, newStatus) {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus })
      showToast('Status updated')
    } catch (err) {
      console.error(err)
      showToast('Failed to update status', 'error')
    }
  }

  async function handleDelete(id, pid) {
    if (!confirm(`Remove lead ${pid} from the dashboard? This cannot be undone.`)) return
    try {
      await deleteDoc(doc(db, 'leads', id))
      showToast('Lead removed')
    } catch (err) {
      console.error(err)
      showToast('Failed to remove lead', 'error')
    }
  }

  function handleLeadAdded() {
    showToast('Lead added successfully')
  }

  return (
    <>
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-l">
          <div className="admin-logo-sm">
            <MapPin size={16} />
          </div>
          <div className="admin-title">Leads Dashboard</div>
          <span className="admin-badge">Admin</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={13} /> Sign Out
        </button>
      </header>

      {/* Body */}
      <div className="admin-body">

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total Leads</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value orange">{stats.pending}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Confirmed</div>
            <div className="stat-value green">{stats.confirmed}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cancelled</div>
            <div className="stat-value red">{stats.cancelled}</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={15} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by name, phone, email, ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="chips">
            {FILTER_LABELS.map(({ key, label, cls }) => (
              <button
                key={key}
                className={`chip ${cls} ${filter === key ? 'active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <button className="btn-add" onClick={() => setShowModal(true)}>
            <Plus size={14} /> Add Lead
          </button>
        </div>

        {/* Leads grid */}
        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ width: 32, height: 32, borderColor: 'var(--green-light)', borderTopColor: 'var(--green)' }} />
            <p style={{ marginTop: 16 }}>Loading leads…</p>
          </div>
        ) : (
          <div className="leads-grid">
            {visible.length === 0 ? (
              <div className="empty-state">
                <Inbox size={48} />
                <h3>No leads found</h3>
                <p>
                  {search || filter !== 'all'
                    ? 'Try adjusting your filters or search term.'
                    : 'No leads yet. Submit the public form or add one manually.'}
                </p>
              </div>
            ) : (
              visible.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Add lead modal */}
      {showModal && (
        <AddLeadModal
          onClose={() => setShowModal(false)}
          onAdded={handleLeadAdded}
        />
      )}

      {/* Toast notifications */}
      <div className="toast-wrap">
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
          </div>
        )}
      </div>
    </>
  )
}
