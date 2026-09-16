import { instagramPosts, instagramProfile } from '../../data/social'
import { business } from '../../data/business'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'
import InstagramEmbed from './InstagramEmbed'

export const InstagramShowcase = ({ limit = 3, showHeading = true }) => (
  <section className="section section--paper">
    <div className="container">
      {showHeading && (
        <SectionHeading
          eyebrow="Follow our journey"
          title="On Instagram"
          description={`Style ideas, new arrivals and real customer looks from ${instagramProfile.handle}.`}
          action={
            <a
              className="btn btn--outline"
              href={instagramProfile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" size={18} /> Follow {instagramProfile.handle}
            </a>
          }
        />
      )}

      <Reveal className="ig-grid">
        {instagramPosts.slice(0, limit).map((post) => (
          <InstagramEmbed key={post.url} post={post} />
        ))}
      </Reveal>

      <Reveal className="social-cta" style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <div>
          <p className="eyebrow">Community</p>
          <h3 style={{ margin: '0.4rem 0 0.3rem' }}>
            {instagramProfile.followers} · {instagramProfile.posts}
          </h3>
          <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
            {instagramProfile.following} · Follow {business.name} for daily saree inspiration.
          </p>
        </div>
        <a
          className="btn"
          href={instagramProfile.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="instagram" size={18} /> See all posts
        </a>
      </Reveal>
    </div>
  </section>
)

export default InstagramShowcase
