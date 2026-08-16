import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    setLoading(false)
    if (error) {
      setError('Login failed. Check your email and password and try again.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="container section" style={{ maxWidth: 420 }}>
      <span className="eyebrow">Staff Login</span>
      <h1>Admin Login</h1>
      <p>For Kameriya Express staff only. Accounts are created by the site administrator via Supabase.</p>

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in…' : 'Log In'}
        </button>
        {error && <p style={{ color: '#b42318', fontSize: '0.9rem' }}>{error}</p>}
      </form>
    </div>
  )
}
