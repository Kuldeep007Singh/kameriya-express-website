import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import { supabase } from '../lib/supabaseClient'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = e.target
    const payload = {
      name: form.name.value.trim(),
      company: form.company.value.trim() || null,
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || null,
      message: form.message.value.trim(),
    }

    const { error } = await supabase.from('quote_requests').insert([payload])

    setLoading(false)

    if (error) {
      setStatus({ type: 'error', text: 'Something went wrong sending your message. Please try again or call us directly.' })
      return
    }

    setStatus({ type: 'success', text: "Thanks — we've received your message and will get back to you shortly." })
    form.reset()
  }

  return (
    <div>
      <PageBanner eyebrow="Contact" title="Get in Touch" />

      <div className="container section">
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input name="name" placeholder="Your name" required />
              <input name="company" placeholder="Company name" />
              <input name="email" type="email" placeholder="Email address" required />
              <input name="phone" type="tel" placeholder="Phone number" />
              <textarea name="message" placeholder="How can we help?" rows={4} required />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
              {status && (
                <p style={{ color: status.type === 'error' ? '#c62828' : 'var(--teal)', fontSize: '0.9rem' }}>
                  {status.text}
                </p>
              )}
            </form>
          </div>

          <div className="card">
            <h3>Contact Details</h3>
            <p><strong>Phone:</strong> +91 95865 16651, +91 92656 30571</p>
            <p><strong>Email:</strong> kameriyaexpressahm@yahoo.com</p>
            <p><strong>Head Office:</strong> L-7/A, Shree Ghantakarn Mahaveer Market, Sarangpur, Ahmedabad, Gujarat, India</p>
            <p><strong>Business Hours:</strong> Mon–Sat, 10:30 AM – 9:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
