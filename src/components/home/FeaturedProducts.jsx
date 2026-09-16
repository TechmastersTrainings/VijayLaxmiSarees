import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../products/ProductGrid'
import Reveal from '../common/Reveal'

export const FeaturedProducts = ({ limit = 4 }) => (
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
        <ProductGrid products={products.slice(0, limit)} eagerCount={2} />
      </Reveal>
    </div>
  </section>
)

export default FeaturedProducts
