import { useEffect, useRef } from 'react'

const SCRIPT_ID = 'instagram-embed-script'
const SCRIPT_SRC = 'https://www.instagram.com/embed.js'

const loadInstagramScript = () =>
  new Promise((resolve) => {
    if (window.instgrm) {
      resolve()
      return
    }
    let script = document.getElementById(SCRIPT_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', () => resolve())
    // Resolve anyway so the fallback caption stays usable if embeds are blocked.
    setTimeout(resolve, 3500)
  })

/**
 * Renders a real Instagram post through Instagram's official embed script —
 * the live post is fetched by Instagram itself. If the embed cannot load
 * (offline, blocked, logged-out), the business's own caption is shown as a
 * graceful fallback so the section is never blank.
 */
export const InstagramEmbed = ({ post }) => {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadInstagramScript().then(() => {
      if (cancelled) return
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process()
      }
    })
    return () => {
      cancelled = true
    }
  }, [post.url])

  return (
    <figure className="ig-embed" ref={ref}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={post.url}
        data-instgrm-version="14"
        style={{ background: '#fff', maxWidth: '540px', width: '100%', margin: 0 }}
      >
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="ig-fallback">
          <span className="eyebrow">Instagram post</span>
          <span className="ig-fallback__caption">{post.caption}</span>
          <span className="btn btn--outline btn--sm">View on Instagram</span>
        </a>
      </blockquote>
    </figure>
  )
}

export default InstagramEmbed
