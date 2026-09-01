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
            <span>Ph: +91 95865 16651</span>
            <span>+91 92656 30571</span>
            <span>kameriyaexpressahm@yahoo.com</span>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="Kameriya Express logo" />
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span /><span /><span />
          </button>

          <nav className={open ? 'navbar-links open' : 'navbar-links'}>
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
        </div>
      </div>
    </header>
  )
}
