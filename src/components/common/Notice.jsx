import Icon from './Icon'

/** Small, honest informational callout (pricing, confirmation notes, etc.). */
export const Notice = ({ children, icon = 'info' }) => (
  <div className="notice" role="note">
    <Icon name={icon} size={18} />
    <div>{children}</div>
  </div>
)

export default Notice
