import { business, whatsappMessage } from '../../data/business'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

export const ContactCta = () => (
  <section className="section section--tight">
    <div className="container">
      <Reveal>
        <div className="contact-cta">
          <div>
            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
              {business.name}
            </span>
            <h2 style={{ margin: '0.5rem 0 0.7rem' }}>
              Can't find the perfect drape? Talk to us.
            </h2>
            <p>
              Message us on WhatsApp for prices, availability and the latest stock — or visit us
              near Papnash Gate, Shiva Nagar, Bidar.
            </p>
          </div>
          <div className="contact-cta__actions">
            <a
              href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to enquire about your sarees.')}
              className="btn btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} /> WhatsApp Enquiry
            </a>
            <a href={business.social.instagram.url} className="btn btn--gold" target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={18} /> DM on Instagram
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

export default ContactCta