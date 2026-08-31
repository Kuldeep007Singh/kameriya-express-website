import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col footer-col-brand">
          <img src="/logo.png" alt="Kameriya Express logo" className="footer-logo" />
          <p>Total Transportation Solutions. Pan-India B2B courier and cargo services. </p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/services">Domestic Courier</Link>
          <Link to="/services">Cargo & Bulk Freight</Link>
          <Link to="/services">Corporate Accounts</Link>
          <Link to="/services">Time-Definite Delivery</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/track">Track Parcel</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>+91 9586516651, +91 9265630571</p>
          <p>contact@kameriyaexpress.com</p>
          <p>L-7/A, Shree Ghantakarn Mahaveer Market, Sarangpur, Ahmedabad, Gujarat, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} Kameriya Express Couriers and Cargo Services. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
