import ProductCard from './ProductCard'
import { cx } from '../../utils/format'

export const ProductGrid = ({ products, columns = 4, eagerCount = 0, className }) => (
  <div className={cx('product-grid', columns === 3 && 'product-grid--3', className)}>
    {products.map((product, i) => (
      <ProductCard key={product.id} product={product} eager={i < eagerCount} />
    ))}
  </div>
)

export default ProductGrid
