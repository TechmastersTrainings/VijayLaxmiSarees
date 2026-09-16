import ProductGrid from './ProductGrid'
import SectionHeading from '../common/SectionHeading'

export const RelatedProducts = ({ products, title = 'You may also like' }) => {
  if (!products.length) return null
  return (
    <section className="section section--cream">
      <div className="container">
        <SectionHeading eyebrow="Curated for you" title={title} />
        <ProductGrid products={products} />
      </div>
    </section>
  )
}

export default RelatedProducts
