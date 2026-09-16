import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import Icon from '../components/common/Icon'

export const NotFound = () => {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
    path: '*',
  })

  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <Icon name="sparkle" size={34} />
          <h1>This drape isn't on the rack</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
          <Link to="/products" className="btn btn--outline">
            Browse Sarees
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound