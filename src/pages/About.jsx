import { Link } from 'react-router-dom'
import { Target, ShieldCheck, Map } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import './Home.css'
import './About.css'

export default function About() {
  // Slugs are kept as-is because About.css maps each one to its background image.
  const points = [
    {
      slug: 'mission',
      icon: Target,
      title: 'Our Mission',
      desc: 'To be the most dependable transportation partner for Indian businesses — combining pan-India reach with the kind of personal, accountable service that only comes from a dedicated team.',
    },
    {
      slug: 'certification',
      icon: ShieldCheck,
      title: 'Our Commitment',
      desc: 'A named point of contact for every account, tracking on every consignment, and rates agreed before pickup.',
    },
    {
      slug: 'reach',
      icon: Map,
      title: 'Our Reach',
      desc: 'Regular pickups across Ahmedabad and the Sanand industrial belt, with delivery across India.',
    },
  ]

  return (
    <div>
      {/* TODO: confirm "Since 2008" is accurate before publishing. */}
      <PageBanner
        eyebrow="About Us"
        title="Moving India's Businesses Forward Since 2008"
        subtitle="A pan-India B2B courier and cargo partner built on reliability, reach, and real accountability."
        image="/images/services/about-team.jpg"
      />

      <div className="container section">
        <span className="eyebrow">Our Story</span>
        <h2 style={{ maxWidth: '24ch' }}>Shipments are promises. We treat them that way.</h2>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          Kameriya Express Couriers and Cargo Services has been moving business shipments out
          of Ahmedabad since 2008. We started as a single-city courier and grew into a
          pan-India B2B courier and cargo partner, because the companies we worked with kept
          needing more: more cities, heavier consignments, and someone who picks up the phone
          when a parcel is running late.
        </p>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          We are at our best with the shipments that fall between a courier and a full truck:
          cartons, spare parts, samples and part loads. We collect from your factory or
          warehouse on a schedule that suits you and deliver across India. We run regular
          pickups across Ahmedabad and the Sanand industrial belt.
        </p>

        <h3 style={{ marginTop: '2rem' }}>How we work</h3>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          Every account has one person to deal with, the same contact every time, not a
          helpline. Pickups happen on fixed days and times, so your dispatch team can plan
          around us. Every consignment gets a tracking ID that updates at each checkpoint from
          pickup to delivery, and rates by destination are agreed before we collect, so the
          bill never comes as a surprise.
        </p>

        <p style={{ maxWidth: '72ch', fontSize: '1.02rem' }}>
          <strong>Tell us what you ship and where.</strong> We will send you a rate quote for
          your routes.
        </p>

        <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
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
