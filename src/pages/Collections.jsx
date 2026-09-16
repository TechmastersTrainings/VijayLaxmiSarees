import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { collections } from '../data/collections'
import Breadcrumbs from '../components/common/Breadcrumbs'
import SmartImage from '../components/common/SmartImage'
import ContactCta from '../components/home/ContactCta'

export const Collections = () => {
  useSeo({
    title: 'Collections',
    description:
      'Explore the collections of Sri Vijaylaxmi Silks, Bidar — wedding wardrobes, pure silk sarees, designer drapes and newly featured arrivals.',
    path: '/collections',
  })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Collections' }]} />
          <h1>Collections</h1>
          <p className="lede" style={{ maxWidth: '60ch' }}>
            Every collection below is built around sarees and wedding wear Sri Vijaylaxmi Silks has
            shared publicly from the store.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="collection-grid">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to={collection.path}
                className="collection-card collection-card--wide"
              >
                <SmartImage src={collection.heroImage} alt={collection.heroAlt} width="600" height="800" />
                <div className="collection-card__body">
                  <span className="collection-card__kicker">{collection.kicker}</span>
                  <h2 className="collection-card__title" style={{ fontSize: '2rem' }}>
                    {collection.title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '52ch', marginBottom: '0.7rem' }}>
                    {collection.description}
                  </p>
                  <span className="collection-card__cta">Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}

export default Collections