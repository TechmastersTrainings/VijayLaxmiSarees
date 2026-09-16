import { Link } from 'react-router-dom'
import { Fragment } from 'react'

export const Breadcrumbs = ({ items = [] }) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb">
    <Link to="/">Home</Link>
    {items.map((item) => (
      <Fragment key={item.label}>
        <span aria-hidden="true">/</span>
        {item.to ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span aria-current="page">{item.label}</span>
        )}
      </Fragment>
    ))}
  </nav>
)

export default Breadcrumbs
