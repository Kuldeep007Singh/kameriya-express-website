import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/track', label: 'Track Parcel' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header>
      <div className="utility-bar">
        <div className="container utility-bar-inner">
          <div className="utility-links">
            <span>Ph: +91 XXXXX XXXXX</span>
            <span>contact@kameriyaexpress.com</span>
          </div>
          <div className="utility-links">
            <span className="iso-badge">ISO 9001:2008 Certified</span>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="Kameriya Express logo" />
          </Link>

          <nav className={`navbar-links ${open ? 'open' : ''}`}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="navbar-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
