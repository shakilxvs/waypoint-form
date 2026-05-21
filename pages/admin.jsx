import { useState, useEffect } from 'react'
import Head from 'next/head'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const token = sessionStorage.getItem('wp_admin_token')
    if (token) setAuthed(true)
    setChecking(false)
  }, [])

  function handleLogin() {
    setAuthed(true)
  }

  function handleLogout() {
    sessionStorage.removeItem('wp_admin_token')
    setAuthed(false)
  }

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--beige)',
      }}>
        <div className="spinner" style={{
          width: 36, height: 36,
          borderColor: 'var(--green-light)',
          borderTopColor: 'var(--green)',
        }} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin — Waypoint Dentistry Leads</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="https://waypointdentistry.com/wp-content/uploads/2026/03/waypoint-logo.png" />
      </Head>

      {authed
        ? <AdminDashboard onLogout={handleLogout} />
        : <AdminLogin onLogin={handleLogin} />
      }
    </>
  )
}
