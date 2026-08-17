import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [trackingId, setTrackingId] = useState('')
  const navigate = useNavigate()

  function handleTrack(e) {
    e.preventDefault()
    const id = trackingId.trim().toUpperCase()
    navigate(id ? `/track?id=${encodeURIComponent(id)}` : '/track')
  }

  const services = [
    { title: 'Domestic Courier', desc: 'Documents & parcels, pan-India' },
    { title: 'Cargo & Bulk Freight', desc: 'Large consignments, tracked' },
    { title: 'Corporate Accounts', desc: 'Dedicated B2B billing & support' },
    { title: 'Time-Definite Delivery', desc: 'Priority service for urgent shipments' },
  ]

  const stats = [
    { value: '50+', label: 'Corporate Clients' },
    { value: '28', label: 'States Covered' },
    { value: '50,000+', label: 'Shipments Delivered' },
    { value: 'ISO 9001', label: '2008 Certified' },
  ]

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Total Transportation Solutions</span>
            <h1>Choosing Target. Delivering On It.</h1>
            <p className="hero-sub">
              Pan-India B2B courier and cargo services for businesses that can't
              afford delays — every shipment tracked from pickup to delivery.
            </p>
          </div>

          <div className="track-widget">
            <p className="track-widget-label">Track your shipment</p>
            <form onSubmit={handleTrack} className="track-widget-form">
              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g. 2230001)"
              />
              <button type="submit" className="btn btn-primary">Track</button>
            </form>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-inner">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">What We Offer</span>
          <h2>Services built for business shipping</h2>
          <div className="service-grid">
            {services.map((s) => (
              <div className="service-tile" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <h2 style={{ color: 'var(--white)' }}>Ready to ship with us?</h2>
            <p style={{ color: '#c7cbe6' }}>Get in touch for corporate account rates and pickup scheduling.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
        </div>
      </section>
    </div>
  )
}
