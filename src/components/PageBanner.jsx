import './PageBanner.css'

export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <div className="page-banner">
      <div className="container">
        {eyebrow && <span className="page-banner-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-banner-subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
