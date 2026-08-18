import { Target, Award, Map } from 'lucide-react'

export default function About() {
  const points = [
    { icon: Target, title: '[Placeholder] Our Mission', desc: 'Describe what drives the business — reliability, speed, coverage, etc.' },
    { icon: Award, title: 'ISO 9001:2008 Certified', desc: 'Quality-managed operations, formally certified — a real trust signal for your corporate clients.' },
    { icon: Map, title: '[Placeholder] Our Reach', desc: 'List the cities/regions you cover, or describe your network here.' },
  ]

  return (
    <div className="container section">
      <span className="eyebrow">About Us</span>
      <h1>[Placeholder] About Kameriya Express</h1>
      <p style={{ maxWidth: '70ch' }}>
        [Placeholder copy] Kameriya Express Couriers and Cargo Services is a pan-India
        B2B transportation company serving corporate clients with reliable, trackable
        delivery. Replace this paragraph with your real company story — when you started,
        what makes your service different, and who you serve.
      </p>

      <div className="service-grid" style={{ marginTop: '2.5rem' }}>
        {points.map((p) => (
          <div className="service-tile" key={p.title}>
            <div className="service-icon"><p.icon size={22} /></div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
