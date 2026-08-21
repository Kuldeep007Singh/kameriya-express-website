import { PackageSearch, Truck, Clock, Building2, Building, PackageCheck } from 'lucide-react'

const services = [
  { icon: PackageSearch, title: 'B2B Courier Delivery', desc: '[Placeholder] Document and parcel delivery for corporate accounts, with scheduled pickups.' },
  { icon: Truck, title: 'Cargo & Bulk Freight', desc: '[Placeholder] Larger consignments moved pan-India with tracked handoffs at every stage.' },
  { icon: Clock, title: 'Time-Definite Delivery', desc: '[Placeholder] Priority shipping options for time-sensitive business shipments.' },
  { icon: Building, title: 'Warehousing & Distribution', desc: '[Placeholder] Describe any storage or distribution services you offer, if applicable.' },
  { icon: Building2, title: 'Corporate Accounts', desc: '[Placeholder] Dedicated account handling, consolidated billing, and reporting for regular B2B clients.' },
  { icon: PackageCheck, title: 'Real-Time Tracking', desc: 'Every shipment logged checkpoint-by-checkpoint — visible to your team the moment it updates.' },
]

export default function Services() {
  return (
    <div className="container section">
      <span className="eyebrow">Services</span>
      <h1>[Placeholder] What We Offer</h1>
      <p style={{ maxWidth: '65ch' }}>
        Replace this intro with a short overview of your service lineup and who it's built for.
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
