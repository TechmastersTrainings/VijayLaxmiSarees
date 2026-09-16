import { useState } from 'react'
import { cx, formatViews } from '../../utils/format'
import { videos, youtubeChannel, featuredVideo } from '../../data/youtube'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'

export const YouTubeShowcase = ({ compact = false }) => {
  const [active, setActive] = useState(featuredVideo)
  const [playing, setPlaying] = useState(false)

  const select = (video) => {
    setActive(video)
    setPlaying(true)
  }

  return (
    <section className={cx('section', compact ? 'section--tight' : 'section--cream')}>
      <div className="container">
        {!compact && (
          <SectionHeading
            eyebrow="Watch"
            title="From our YouTube"
            description="Store tours, wedding collection films and saree stories from our channel."
            action={
              <a
                className="btn btn--outline"
                href={youtubeChannel.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="youtube" size={18} /> {youtubeChannel.subscribers}
              </a>
            }
          />
        )}

        <Reveal className="video-grid">
          <div>
            <div className="video-feature">
              {playing ? (
                <iframe
                  key={active.id}
                  width="100%"
                  style={{ aspectRatio: '16 / 9', border: 0 }}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="video-play"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play video: ${active.title}`}
                >
                  <img src={active.thumbnail} alt="" width="960" height="540" loading="lazy" />
                  <span className="video-play__btn">
                    <Icon name="play" size={26} />
                  </span>
                  <span className="video-feature__meta" style={{ textAlign: 'left' }}>
                    <h3>{active.title}</h3>
                    <span className="muted" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {formatViews(active.views)} · {active.duration} · {active.uploaded}
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="video-list" role="list">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                role="listitem"
                className={cx('video-item', video.id === active.id && 'is-active')}
                onClick={() => select(video)}
              >
                <img src={video.thumbnail} alt="" width="260" height="146" loading="lazy" />
                <span>
                  <span className="video-item__title">{video.title}</span>
                  <span className="video-item__meta">
                    {formatViews(video.views)} · {video.duration}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default YouTubeShowcase
