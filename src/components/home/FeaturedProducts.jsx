import { Link } from 'react-router-dom'
import { useCatalog } from '../../context/CatalogContext'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../products/ProductGrid'
import Reveal from '../common/Reveal'

export const FeaturedProducts = ({ limit = 4 }) => {
  const catalog = useCatalog()
  return (
    <section className="section section--paper">
      <div className="container">
        <SectionHeading
          eyebrow="Featured sarees"
          title="Real pieces from our catalogue"
          description="A selection of sarees published by Sri Vijaylaxmi Silks. Each piece can be viewed in detail, added to your bag or enquired about on WhatsApp."
          action={
            <Link to="/products" className="btn btn--outline">
              Shop all sarees
            </Link>
          }
        />
        <Reveal>
          <ProductGrid products={catalog.products.slice(0, limit)} eagerCount={2} />
        </Reveal>
      </div>
    </section>
  )
}

export default FeaturedProducts
