import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'

/**
 * Single button primitive used everywhere. Renders a router <Link> when `to`
 * is given, an external <a> when `href` is given, otherwise a <button>.
 */
export const Button = ({
  to,
  href,
  variant = 'primary',
  size,
  block,
  className,
  children,
  ...rest
}) => {
  const classes = cx(
    'btn',
    variant !== 'primary' && `btn--${variant}`,
    size && `btn--${size}`,
    block && 'btn--block',
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
