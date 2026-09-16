import { Outlet } from 'react-router-dom'
import Header from '../navigation/Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'

export const Layout = () => (
  <>
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <Header />
    <main id="main">
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </>
)

export default Layout