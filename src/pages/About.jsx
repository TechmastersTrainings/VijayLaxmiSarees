import { useSeo } from '../hooks/useSeo'
import { business } from '../data/business'
import storeImage from '../assets/brand/store-bidar.webp'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Reveal from '../components/common/Reveal'
import Icon from '../components/common/Icon'
import ContactCta from '../components/home/ContactCta'

const principles = [
  {
    icon: 'shield',
    title: 'Real catalogue, real price',
    text: 'The pieces shown here are sarees the store has actually published. Prices are catalogue prices — never inflated MRPs or fake discounts.',
  },
  {
    icon: 'whatsapp',
    title: 'Confirmed on WhatsApp',
    text: 'Price, availability and delivery from Bidar are confirmed by our team before anything is finalised — nothing is silently charged.',
  },
  {
    icon: 'sparkle',
    title: 'For the whole family',
    text: 'Mother, grandmother, aunt, sister, bride — the collection spans Kanchipuram to Banarasi, tissue to georgette, tradition to trend.',
  },
]

export const About = () => {
  useSeo({
    title: 'About',
    description:
      'Meet Sri Vijaylaxmi Silks, Bidar — a saree store built for the whole family, from timeless Kanchipuram silk to contemporary designer drapes, near Papnash Gate, Shiva Nagar.',
    path: '/about',
  })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'About' }]} />
          <h1>About the store</h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>
            {business.name} is a saree store in {business.city}, {business.state} — a one-stop
            wardrobe for the whole family.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal className="split__media split__media--store">
              <span className="split__frame" aria-hidden="true" />
              <img
                src={storeImage}
                alt="The Sri Vijaylaxmi Silks store entrance at Shivam Complex, Bidar"
                width="256"
                height="256"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="split__content" delay={100}>
              <span className="eyebrow">Our promise</span>
              <h2 style={{ margin: '0.6rem 0 0.9rem' }}>Every member of the family, beautiful and special</h2>
              <p className="lede">{business.intro}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Why shop with us</span>
              <h2 style={{ margin: '0.4rem 0 0.2rem' }}>Honest, transparent saree shopping</h2>
            </div>
          </div>
          <div className="principles">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="principle">
                  <Icon name={p.icon} size={22} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The collection</span>
              <h2 style={{ margin: '0.4rem 0 0.2rem' }}>What you'll find at the store</h2>
            </div>
          </div>
          <div className="category-cloud">
            {business.categories.map((category) => (
              <span key={category} className="badge badge--gold badge--lg">
                {category}
              </span>
            ))}
          </div>
          <p className="muted" style={{ maxWidth: '60ch', marginTop: '1.5rem' }}>
            Availability varies by season and stock — message the store on WhatsApp to check what's
            currently in {business.city}.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="about-social">
            <div>
              <span className="eyebrow">{business.social.instagram.followers}</span>
              <h2 style={{ margin: '0.3rem 0' }}>@{business.social.instagram.handle.slice(1)}</h2>
              <p className="muted">
                {business.social.instagram.posts} of saree styling, {business.social.instagram.following} from the store ·{' '}
                {business.social.youtube.subscribers} on YouTube.
              </p>
            </div>
            <p className="lede" style={{ maxWidth: '46ch' }}>
              This site is built entirely from the business's own public content — no reviews,
              ratings or numbers are invented.
            </p>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}

export default About