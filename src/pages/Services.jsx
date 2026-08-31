import { PackageSearch, Truck, Clock, Home, Building2, PackageCheck } from 'lucide-react'

const services = [
  { icon: PackageSearch, title: 'B2B & Personal Courier', desc: 'Document and parcel delivery for both corporate accounts and individual senders, with scheduled pickups and reliable turnaround.' },
  { icon: Truck, title: 'Cargo & Bulk Freight', desc: 'Larger consignments and full-truck-load shipments moved pan-India, with tracked handoffs at every stage of the journey.' },
  { icon: Clock, title: 'Express & Time-Definite Delivery', desc: 'Priority routing and next-day delivery options for shipments where timing genuinely matters.' },
  { icon: Home, title: 'Door-to-Door Pickup & Distribution', desc: 'We collect from your doorstep and distribute across metros, tier-2 and tier-3 cities — no drop-off points required.' },
  { icon: Building2, title: 'Corporate Accounts', desc: 'Dedicated account handling, consolidated billing, and reporting built for businesses that ship regularly.' },
  { icon: PackageCheck, title: 'Real-Time Tracking', desc: 'Every shipment logged checkpoint-by-checkpoint — visible to you and your team the moment it updates.' },
]

export default function Services() {
  return (
    <div className="container section">
      <span className="eyebrow">Services</span>
      <h1>What We Offer</h1>
      <p style={{ maxWidth: '65ch' }}>
        From a single personal parcel to a full-truck-load business shipment, Kameriya
        Express covers the full range of transportation needs — for individuals sending
        occasionally and businesses shipping every day.
      </p>

      <div className="service-grid" style={{ marginTop: '2rem' }}>
        {services.map((s) => (
          <div className="service-tile" key={s.title}>
            <div className="service-icon"><s.icon size={22} /></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
