/**
 * POST /api/auth
 * Verifies admin credentials against Vercel env vars (server-side only).
 * Returns a simple session token stored client-side in sessionStorage.
 */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const validEmail = process.env.ADMIN_EMAIL
  const validPass  = process.env.ADMIN_PASSWORD

  if (email.trim() === validEmail && password === validPass) {
    // Simple opaque token — not cryptographically strong but
    // sufficient for a single-admin dashboard on a non-sensitive route.
    const token = Buffer.from(
      JSON.stringify({ email, ts: Date.now() })
    ).toString('base64')
    return res.status(200).json({ success: true, token })
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password.' })
}
