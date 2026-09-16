import { useSeo } from '../hooks/useSeo'
import { instagramProfile, instagramPosts } from '../data/social'
import Breadcrumbs from '../components/common/Breadcrumbs'
import InstagramShowcase from '../components/social/InstagramShowcase'
import Icon from '../components/common/Icon'
import Button from '../components/common/Button'

export const Instagram = () => {
  useSeo({
    title: 'Instagram',
    description:
      'Real Instagram posts from Sri Vijaylaxmi Silks, Bidar — saree styling, new arrivals and customer looks from the store.',
    path: '/instagram',
  })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Instagram' }]} />
          <div className="social-hero">
            <div className="social-hero__avatar" aria-hidden="true">
              <Icon name="instagram" size={30} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
                {instagramProfile.followers}
              </span>
              <h1>{instagramProfile.handle}</h1>
              <p className="muted">
                {instagramProfile.posts} · {instagramProfile.following} — posted from the store in
                Bidar.
              </p>
            </div>
            <Button
              href={instagramProfile.url}
              variant="light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" size={18} /> Follow on Instagram
            </Button>
          </div>
        </div>
      </header>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Real posts</span>
              <h2 style={{ margin: '0.4rem 0 0.2rem' }}>
                {instagramPosts.length} {instagramPosts.length === 1 ? 'post' : 'posts'} featured
              </h2>
              <p className="muted">
                Rendered live through Instagram's official embed — the same posts you'll see on
                their profile.
              </p>
            </div>
          </div>
          <InstagramShowcase showHeading={false} />
        </div>
      </section>
    </>
  )
}

export default Instagram