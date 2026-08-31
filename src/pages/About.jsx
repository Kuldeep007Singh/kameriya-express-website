import { Target, Award, Map, Truck } from 'lucide-react'

export default function About() {
  const points = [
    { icon: Target, title: 'Our Mission', desc: 'To be the most dependable transportation partner for Indian businesses — combining pan-India reach with the kind of personal, accountable service that only comes from a dedicated team.' },
    { icon: Award, title: 'ISO 9001:2008 Certified', desc: 'Certified since our founding year — quality-managed operations you can rely on and hold up to your own clients and compliance requirements.' },
    { icon: Map, title: 'Our Reach', desc: 'Coverage across 28 states, serving 500+ corporate clients with over 1,00,000 shipments delivered and counting.' },
  ]

  return (
    <div className="container section">
      <span className="eyebrow">About Us</span>
      <h1>About Kameriya Express</h1>
      <p style={{ maxWidth: '70ch' }}>
        Kameriya Express Couriers and Cargo Services has been moving India's businesses
        forward since 2008. What started as a focused courier operation has grown into a
        full pan-India transportation partner — handling everything from single
        time-sensitive parcels to full-truck-load cargo for corporate accounts across the
        country.
      </p>
      <p style={{ maxWidth: '70ch' }}>
        We were ISO 9001:2008 certified the same year we started, and that commitment to
        quality-managed, accountable operations has stayed at the core of how we work ever
        since. Whether it's speed, nationwide reach, personal attention to your account, or
        straightforward pricing you can plan around — we built Kameriya Express to deliver
        on all of it, not just one.
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
