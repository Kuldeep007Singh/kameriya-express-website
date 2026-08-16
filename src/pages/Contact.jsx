import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder: no backend wired yet. Options once you're ready:
    // 1) Insert into a Supabase "contact_messages" table (same project as parcels)
    // 2) Use a form service like Formspree / Web3Forms
    // 3) Send via an email API (Resend, SendGrid) from a small serverless function
    setStatus('Thanks — this form is a placeholder for now. Message not actually sent yet.')
    e.target.reset()
  }

  return (
    <div className="container section">
      <span className="eyebrow">Contact</span>
      <h1>Get in Touch</h1>

      <div className="grid-2" style={{ marginTop: '2rem', alignItems: 'start' }}>
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
          <p><strong>Phone:</strong> [Placeholder] +91 XXXXX XXXXX</p>
          <p><strong>Email:</strong> [Placeholder] contact@kameriyaexpress.com</p>
          <p><strong>Head Office:</strong> [Placeholder] Ahmedabad, Gujarat, India</p>
          <p><strong>Business Hours:</strong> [Placeholder] Mon–Sat, 9:30 AM – 7:00 PM</p>
        </div>
      </div>
    </div>
  )
}
