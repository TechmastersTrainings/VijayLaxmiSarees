import { useState } from 'react'
import { cx } from '../../utils/format'
import SmartImage from '../common/SmartImage'

/**
 * Product gallery. The catalogue currently publishes one photograph per
 * saree, so the thumbnail strip only appears when more than one image is
 * genuinely available.
 */
export const ProductGallery = ({ product }) => {
  const images = product.gallery?.length ? product.gallery : [product.image]
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="gallery__main">
        <SmartImage
          src={images[active]}
          alt={product.imageAlt}
          eager
          width="800"
          height="1000"
        />
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={cx('gallery__thumb', i === active && 'is-active')}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <SmartImage src={src} alt="" width="120" height="150" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery
