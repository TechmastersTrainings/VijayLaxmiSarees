import { Link } from 'react-router-dom'
import { collections } from '../../data/collections'
import SectionHeading from '../common/SectionHeading'
import SmartImage from '../common/SmartImage'

export const CollectionShowcase = () => (
  <section className="section" id="featured-collections">
    <div className="container">
      <SectionHeading
        eyebrow="Curated collections"
        title="Shop by collection"
        description="Explore silk, designer and wedding wardrobes — every saree below is one Sri Vijaylaxmi Silks has shared publicly."
        action={
          <Link to="/collections" className="btn btn--outline">
            View all collections
          </Link>
        }
      />
      <div className="collection-grid">
        {collections.map((collection) => (
          <Link key={collection.slug} to={collection.path} className="collection-card">
            <SmartImage src={collection.heroImage} alt={collection.heroAlt} width="600" height="800" />
            <div className="collection-card__body">
              <span className="collection-card__kicker">{collection.kicker}</span>
              <h3 className="collection-card__title">{collection.title}</h3>
              <span className="collection-card__cta">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default CollectionShowcase
