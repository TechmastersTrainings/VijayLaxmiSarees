import { cx } from '../../utils/format'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import SmartImage from '../common/SmartImage'

/**
 * Reusable editorial split (image + copy) used for the wedding, silk and
 * designer home sections. All copy is real business content.
 */
export const FeatureSplit = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  quote,
  ctaLabel,
  ctaTo,
  ctaVariant = 'primary',
  reverse = false,
  imageClass = '',
}) => (
  <section className="section section--cream">
    <div className="container">
      <div className={cx('split', reverse && 'split--reverse')}>
        <Reveal className="split__media">
          <span className="split__frame" aria-hidden="true" />
          <SmartImage
            src={image}
            alt={imageAlt}
            className={imageClass && `split__media--${imageClass}`}
            width="600"
            height="750"
          />
        </Reveal>
        <Reveal className="split__content" delay={100}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 style={{ margin: '0.6rem 0 0.9rem' }}>{title}</h2>
          {description && <p className="lede">{description}</p>}
          {quote && <blockquote className="quote">{quote}</blockquote>}
          <Button to={ctaTo} variant={ctaVariant} style={{ marginTop: '0.6rem' }}>
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </div>
  </section>
)

export default FeatureSplit