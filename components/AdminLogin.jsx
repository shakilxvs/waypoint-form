import { useState } from 'react'
import { ShieldCheck, LogIn, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin({ onLogin }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.success) {
        sessionStorage.setItem('wp_admin_token', data.token)
        onLogin()
      } else {
        setError(data.message || 'Invalid credentials.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <ShieldCheck size={26} />
        </div>
        <h2>Admin Access</h2>
        <p>Waypoint Dentistry · Leads Dashboard</p>

        {error && <div className="login-err">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ textAlign: 'left', marginBottom: '14px' }}>
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@waypointdentistry.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label htmlFor="admin-pass">Password</label>
            <div className="pass-wrap">
              <input
                id="admin-pass"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-pass"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <><span className="spinner" /> Signing in…</> : <><LogIn size={15} /> Sign In</>}
          </button>
        </form>

        <p className="demo-hint">
          Credentials are stored securely in Vercel environment variables.
        </p>
      </div>
    </div>
  )
}
