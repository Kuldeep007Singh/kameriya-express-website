import { useState } from 'react'
import PageBanner from '../components/PageBanner'

export default function Contact() {
  const [status, setStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('Thanks — this form is a placeholder for now. Message not actually sent yet.')
    e.target.reset()
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
              <button type="submit" className="btn btn-primary">Send Message</button>
              {status && <p style={{ color: 'var(--teal)', fontSize: '0.9rem' }}>{status}</p>}
            </form>
          </div>

          <div className="card">
            <h3>Contact Details</h3>
            <p><strong>Phone:</strong> +91 95865 16651, +91 92656 30571</p>
            <p><strong>Email:</strong> contact@kameriyaexpress.com</p>
            <p><strong>Head Office:</strong> L-7/A, Ghantakarn Mahaveer Market, Ahmedabad, Gujarat, India</p>
            <p><strong>Business Hours:</strong> Mon–Sat, 10:30 AM – 9:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
