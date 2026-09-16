import { cx } from '../../utils/format'
import Reveal from './Reveal'

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
}) => (
  <Reveal className={cx('section-head', align === 'center' && 'section-head--center')}>
    <div className="section-head__text">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {description && <p className="lede">{description}</p>}
    </div>
    {action && <div className="section-head__action">{action}</div>}
  </Reveal>
)

export default SectionHeading
