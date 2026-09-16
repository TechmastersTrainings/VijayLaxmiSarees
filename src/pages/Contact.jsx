import { useSeo } from '../hooks/useSeo'
import { business, whatsappMessage } from '../data/business'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Notice from '../components/common/Notice'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'

const mapsQuery = encodeURIComponent(business.address.full)
const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`

export const Contact = () => {
  useSeo({
    title: 'Contact & Visit',
    description:
      `Visit ${business.name} at ${business.address.line1}, ${business.address.line2}, ${business.address.city}. Call or WhatsApp +91 97383 49190 for prices and stock.`,
    path: '/contact',
  })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <h1>Visit the store</h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>
            {business.name} is at Shivam Complex, Main Gate, Opp. Papnash — Havappa Layout, Shiva
            Nagar, {business.city}. Families come from across North Karnataka for our weddings.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <div className="contact-card">
                <span className="eyebrow">Store details</span>

                <ul className="contact-list">
                  <li>
                    <span className="contact-list__icon">
                      <Icon name="map-pin" size={20} />
                    </span>
                    <div>
                      <h3>Address</h3>
                      <p>
                        {business.name}
                        <br />
                        {business.address.line1}
                        <br />
                        {business.address.line2}
                        <br />
                        {business.address.city}, {business.address.state}{' '}
                        {business.address.postalCode}
                      </p>
                      <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="link">
                        Get directions from your location
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="contact-list__icon">
                      <Icon name="phone" size={20} />
                    </span>
                    <div>
                      <h3>Phone & WhatsApp</h3>
                      <p>
                        <a href={`tel:${business.contact.phoneE164}`}>{business.contact.phoneDisplay}</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-list__icon">
                      <Icon name="clock" size={20} />
                    </span>
                    <div>
                      <h3>Opening hours</h3>
                      <p>{business.hours.summary}</p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-list__icon">
                      <Icon name="instagram" size={20} />
                    </span>
                    <div>
                      <h3>Social</h3>
                      <p>
                        <a href={business.social.instagram.url} className="link" target="_blank" rel="noopener noreferrer">
                          Instagram {business.social.instagram.handle}
                        </a>
                        <br />
                        <a href={business.social.youtube.url} className="link" target="_blank" rel="noopener noreferrer">
                          YouTube {business.social.youtube.handle}
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>

                <Notice icon="info">
                  <strong>Confirm before you visit.</strong> Phone number and hours above are from
                  public listings — a quick WhatsApp message confirms timings and stock.
                </Notice>

                <div className="contact-cta__actions" style={{ marginTop: '1.2rem' }}>
                  <Button
                    href={whatsappMessage('Hello Sri Vijaylaxmi Silks, I would like to visit the store. What are your timings today?')}
                    variant="whatsapp"
                  >
                    <Icon name="whatsapp" size={18} /> Message us on WhatsApp
                  </Button>
                  <Button href={business.social.instagram.url} variant="outline" target="_blank" rel="noopener noreferrer">
                    <Icon name="instagram" size={18} /> DM on Instagram
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="contact-map">
                <iframe
                  title={`Map to ${business.name}, ${business.address.city}`}
                  src={mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact