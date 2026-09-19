import './PageBanner.css'

export default function PageBanner({ eyebrow, title, subtitle, image }) {
  return (
    <div
      className={`page-banner${image ? ' page-banner--image' : ''}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(115deg, rgba(10, 22, 64, 0.88) 0%, rgba(10, 22, 64, 0.82) 100%), url('${image}')`,
            }
          : undefined
      }
    >
      <div className="container">
        {eyebrow && <span className="page-banner-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-banner-subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
