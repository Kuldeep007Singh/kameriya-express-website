import { Target, Award, Map } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import './Home.css'
import './About.css'

export default function About() {
  const points = [
    {
      slug: 'mission',
      icon: Target,
      title: 'Our Mission',
      desc: 'To be the most dependable transportation partner for Indian businesses — combining pan-India reach with the kind of personal, accountable service that only comes from a dedicated team.',
    },
    {
      slug: 'certification',
      icon: Award,
      title: 'ISO 9001:2008 Certified',
      desc: 'Certified since our founding year — quality-managed operations you can rely on and hold up to your own clients and compliance requirements.',
    },
    {
      slug: 'reach',
      icon: Map,
      title: 'Our Reach',
      desc: 'Coverage across 28 states, serving 500+ corporate clients with over 1,00,000 shipments delivered and counting.',
    },
  ]

  return (
    <div>
      <PageBanner
        eyebrow="About Us"
        title="Moving India's Businesses Forward Since 2008"
        subtitle="A pan-India transportation partner built on reliability, reach, and real accountability."
        image="/images/services/about-team.jpg"
      />

      <div className="container section">
        <span className="eyebrow">Our Story</span>
        <h2 style={{ maxWidth: '20ch' }}>Built on a simple idea: shipments are promises.</h2>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          Kameriya Express Couriers and Cargo Services started in 2008 as a focused courier
          operation in Ahmedabad, built around a straightforward premise — every parcel
          represents a commitment someone made to a customer, a partner, or a deadline, and
          that commitment deserves to be treated seriously. What began as a single-city
          courier service has since grown into a full pan-India transportation partner,
          handling everything from a single time-sensitive envelope to full-truck-load cargo
          for corporate accounts across the country.
        </p>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          We earned our ISO 9001:2008 certification the same year we opened our doors, and it
          set the tone for how we've operated ever since — not as a badge to display, but as a
          discipline to maintain. Every pickup, transit leg, and delivery runs through the same
          quality-managed process, whether it's a single parcel for a small business or a
          recurring corporate account moving hundreds of shipments a month.
        </p>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          Today, that discipline shows up as coverage across 28 states, relationships with 500+
          corporate clients, and more than 1,00,000 shipments delivered — but the reason
          clients stay with us isn't the scale, it's the accountability. A named point of
          contact for every account. Transparent, trackable transit. Pricing you can plan
          around instead of guess at. We built Kameriya Express to be the transportation
          partner a growing business can actually rely on, not just another courier on a list.
        </p>
      </div>

      <div className="about-blocks">
        {points.map((p) => (
          <div className={`service-block about-block--${p.slug}`} key={p.slug}>
            <div className="service-block-overlay" />
            <div className="service-block-content">
              <div className="service-icon"><p.icon size={22} /></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
