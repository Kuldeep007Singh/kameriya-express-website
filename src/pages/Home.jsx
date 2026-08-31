import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  PackageSearch, Truck, Home as HomeIcon, Zap, Users, Star,
  Building, Globe2, Award, Search,
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
    { icon: Globe2, title: 'Pan-India Network', desc: 'Reliable pickup and delivery across metros, tier-2 and tier-3 cities, nationwide.' },
    { icon: HomeIcon, title: 'Door-to-Door Service', desc: 'We collect from your doorstep and deliver straight to the recipient — no drop-off points, no hassle.' },
    { icon: Zap, title: 'Express Parcel Delivery', desc: 'Time-sensitive shipments handled with priority routing and next-day delivery options.' },
    { icon: Users, title: 'Personal & Business Courier', desc: 'From individual parcels to high-volume business shipping — one partner for every kind of send.' },
    { icon: Star, title: 'Priority Business Accounts', desc: 'Dedicated handling, consolidated billing, and personalised support for regular corporate clients.' },
    { icon: Truck, title: 'Surface & Air Cargo', desc: 'Bulk freight and time-critical air cargo, tracked and accountable from pickup to delivery.' },
  ]

  const stats = [
    { icon: Building, value: '500+', label: 'Corporate Clients' },
    { icon: Globe2, value: '28', label: 'States Covered' },
    { icon: Users, value: '1,00,000+', label: 'Shipments Delivered' },
    { icon: Award, value: 'ISO 9001', label: '2008 Certified' },
  ]

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">&nbsp; Pan-India Network</span>
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
            From a single personal parcel to a full-truck-load business shipment — one accountable partner, one bill, complete visibility.
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
