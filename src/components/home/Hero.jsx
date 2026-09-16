import heroImage from '../../assets/products/kanchipuram-red-silver-brocade.jpg'
import { business } from '../../data/business'
import Button from '../common/Button'
import Icon from '../common/Icon'

export const Hero = () => (
  <section className="hero" aria-label="Sri Vijaylaxmi Silks, Bidar">
    <div className="hero__media">
      <img
        src={heroImage}
        alt="Red Kanchipuram silk saree with silver brocade from Sri Vijaylaxmi Silks, Bidar"
        width="800"
        height="1000"
        fetchpriority="high"
      />
    </div>

    <div className="container hero__inner">
      <div className="hero__content">
        <span className="hero__eyebrow">{business.locality}</span>
        <h1>
          Silk sarees &amp; wedding wear, <em>woven for your celebrations</em>
        </h1>
        <p>
          From timeless Kanchipuram to luxurious Banarasis, Sri Vijaylaxmi Silks brings Bidar a
          collection for every occasion — for mothers, grandmothers, aunts, sisters and brides.
        </p>

        <div className="hero__actions">
          <Button to="/collections">Explore Collections</Button>
          <Button to="/products" variant="light">
            Shop Sarees
          </Button>
        </div>

        <div className="hero__stats">
          <div>
            <div className="hero__stat-value">{business.social.instagram.followers}</div>
            <div className="hero__stat-label">Instagram community</div>
          </div>
          <div>
            <div className="hero__stat-value">{business.social.instagram.posts}</div>
            <div className="hero__stat-label">Looks shared</div>
          </div>
          <div>
            <div className="hero__stat-value">{business.social.youtube.subscribers}</div>
            <div className="hero__stat-label">On YouTube</div>
          </div>
        </div>
      </div>
    </div>

    <a
      href="#featured-collections"
      className="visually-hidden"
      aria-label="Skip to collections"
    >
      <Icon name="chevron-down" />
    </a>
  </section>
)

export default Hero
