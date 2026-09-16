import { Link } from 'react-router-dom'
import logo from '../../assets/brand/sri-vijaylaxmi-silks-logo.png'
import { business } from '../../data/business'

export const Brand = ({ onClick }) => (
  <Link to="/" className="brand" onClick={onClick} aria-label={`${business.name} — home`}>
    <img className="brand__mark" src={logo} alt={`${business.name} logo`} width="42" height="42" />
    <span className="brand__text">
      <span className="brand__name">Sri Vijaylaxmi</span>
      <span className="brand__sub">Silks · Bidar</span>
    </span>
  </Link>
)

export default Brand
