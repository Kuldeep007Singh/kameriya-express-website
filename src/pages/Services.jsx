import { PackageSearch, Truck, Clock, Home, Building2, PackageCheck } from 'lucide-react'
import PageBanner from '../components/PageBanner'

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
    <div>
      <PageBanner
        eyebrow="Services"
        title="What We Offer"
        subtitle="From a single personal parcel to a full-truck-load business shipment — one accountable partner, one bill, complete visibility."
      />

      <div className="container section">
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
    </div>
  )
}
