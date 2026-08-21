import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  PackageSearch, Truck, Plane, Building2, RefreshCcw, Globe2,
  Building, Users, Award, Search,
} from 'lucide-react'
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
    { icon: Truck, title: 'Surface Cargo', desc: 'Reliable road transportation for bulk B2B shipments across India.' },
    { icon: Plane, title: 'Air Cargo', desc: 'Priority air freight for time-sensitive corporate consignments.' },
    { icon: PackageSearch, title: 'Domestic Courier', desc: 'Door-to-door document and parcel courier with next-day delivery.' },
    { icon: Building2, title: 'Corporate Accounts', desc: 'Dedicated B2B billing, reporting, and account support.' },
    { icon: RefreshCcw, title: 'Reverse Logistics', desc: 'End-to-end returns handling for retail and e-commerce clients.' },
    { icon: Globe2, title: 'Pan-India Distribution', desc: 'Multi-drop distribution across metros, tier-2 and tier-3 cities.' },
  ]

  const stats = [
    { icon: Building, value: '500+', label: 'Corporate Clients' },
    { icon: Globe2, value: '25+', label: 'States Covered' },
    { icon: Users, value: '10,000+', label: 'Shipments Delivered' },
    { icon: Award, value: 'ISO 9001', label: '2008 Certified' },
  ]

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">ISO 9001:2008 Certified &nbsp;|&nbsp; Pan-India Network</span>
            <h1>Total Transportation Solutions, Delivered on Target.</h1>
            <p className="hero-sub">
              Trusted B2B courier and cargo partner for enterprises across India —
              door-to-door pickup, dedicated fleet, and full shipment visibility.
            </p>
          </div>

          <div className="track-widget">
            <div className="track-widget-header">
              <Search size={18} />
              <span>Track Your Shipment</span>
            </div>
            <div className="track-widget-body">
              <p className="track-widget-label">Tracking ID</p>
              <form onSubmit={handleTrack} className="track-widget-form">
                <input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g. 2230001"
                />
                <button type="submit" className="btn btn-primary">Track</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-inner">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <s.icon size={22} className="stat-icon" />
              <div>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">What We Offer</span>
          <h2>Total Transportation Solutions</h2>
          <p style={{ maxWidth: '60ch' }}>
            From single-parcel courier to full-truck-load cargo — one accountable partner, one bill, complete visibility.
          </p>
          <div className="service-grid">
            {services.map((s) => (
              <div className="service-tile" key={s.title}>
                <div className="service-icon"><s.icon size={22} /></div>
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
