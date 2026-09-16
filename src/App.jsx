import { Routes, Route } from 'react-router-dom'
import { CatalogProvider } from './context/CatalogContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Wedding from './pages/Wedding'
import SilkSarees from './pages/SilkSarees'
import DesignerSarees from './pages/DesignerSarees'
import NewArrivals from './pages/NewArrivals'
import About from './pages/About'
import Contact from './pages/Contact'
import CartPage from './pages/Cart'
import Checkout from './pages/Checkout'
import Instagram from './pages/Instagram'
import YouTubePage from './pages/YouTube'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export const App = () => (
  <CatalogProvider>
    <CartProvider>
      <WishlistProvider>
        <Routes>
          <Route path="admin" element={<Admin />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="wedding" element={<Wedding />} />
            <Route path="silk-sarees" element={<SilkSarees />} />
            <Route path="designer-sarees" element={<DesignerSarees />} />
            <Route path="new-arrivals" element={<NewArrivals />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="instagram" element={<Instagram />} />
            <Route path="youtube" element={<YouTubePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </WishlistProvider>
    </CartProvider>
  </CatalogProvider>
)

export default App