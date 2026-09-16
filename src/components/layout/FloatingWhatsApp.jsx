import { whatsappMessage } from '../../data/business'
import Icon from '../common/Icon'

export const FloatingWhatsApp = () => (
  <a
    href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your collection.')}
    className="floating-wa"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Sri Vijaylaxmi Silks on WhatsApp"
  >
    <Icon name="whatsapp" size={20} />
    <span>WhatsApp</span>
  </a>
)

export default FloatingWhatsApp
