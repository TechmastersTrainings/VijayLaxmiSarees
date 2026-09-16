import { useSeo } from '../hooks/useSeo'
import { youtubeChannel } from '../data/youtube'
import Breadcrumbs from '../components/common/Breadcrumbs'
import YouTubeShowcase from '../components/social/YouTubeShowcase'
import Icon from '../components/common/Icon'
import Button from '../components/common/Button'

export const YouTubePage = () => {
  useSeo({
    title: 'YouTube',
    description:
      'Watch Sri Vijaylaxmi Silks, Bidar on YouTube — store tours, wedding collection films and saree stories.',
    path: '/youtube',
  })

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'YouTube' }]} />
          <div className="social-hero">
            <div className="social-hero__avatar" aria-hidden="true">
              <Icon name="youtube" size={30} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
                {youtubeChannel.subscribers}
              </span>
              <h1>{youtubeChannel.handle}</h1>
              <p className="muted">
                {youtubeChannel.videos} public videos from the store — weddings in full swing.
              </p>
            </div>
            <Button
              href={youtubeChannel.url}
              variant="light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="youtube" size={18} /> Visit the channel
            </Button>
          </div>
        </div>
      </header>

      <YouTubeShowcase compact />
    </>
  )
}

export default YouTubePage