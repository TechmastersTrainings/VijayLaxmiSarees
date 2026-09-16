import { cx } from '../../utils/format'
import { useReveal } from '../../hooks/useReveal'

/** Fades content in as it enters the viewport. Respects reduced motion. */
export const Reveal = ({ as: Tag = 'div', delay = 0, className, children, ...rest }) => {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
