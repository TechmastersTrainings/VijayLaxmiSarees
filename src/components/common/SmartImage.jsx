import { cx } from '../../utils/format'

/**
 * Image wrapper with native lazy-loading, async decoding and intrinsic size
 * hints so long product grids stay fast.
 */
export const SmartImage = ({
  src,
  alt,
  className,
  width = 400,
  height = 500,
  eager = false,
  ...rest
}) => (
  <img
    src={src}
    alt={alt}
    className={cx(className)}
    width={width}
    height={height}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    {...rest}
  />
)

export default SmartImage
