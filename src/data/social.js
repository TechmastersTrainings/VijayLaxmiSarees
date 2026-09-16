import { business } from './business'

/**
 * Real, publicly visible Instagram posts from @srivijaylaxmisilks.
 * These are embedded through Instagram's official embed script so the live
 * post renders — the site does not copy or re-host the media.
 *
 * Add more post URLs here to grow the showcase. Nothing is fabricated: the
 * `caption` values are the business's own published captions (lightly
 * trimmed for display).
 */
export const instagramPosts = [
  {
    url: 'https://www.instagram.com/srivijaylaxmisilks/p/CzY0auBPYrG/',
    title: 'Golden & red Diwali drape',
    caption:
      'A golden saree with a striking red blouse — a grand look for Diwali pooja. The golden saree represents prosperity and the red blouse adds vibrancy and auspiciousness.',
  },
  {
    url: 'https://www.instagram.com/srivijaylaxmisilks/p/C2e9e4uPh3z/',
    title: 'Kalamkari saree, restyled',
    caption:
      'A loyal customer reimagined an outfit from a Kalamkari saree purchased from SVS — beautiful proof of how our sarees can be restyled and recreated.',
  },
  {
    url: 'https://www.instagram.com/srivijaylaxmisilks/p/CyOXNYwPy2y/',
    title: 'Muhurtham morning wedding picks',
    caption:
      'Brides and bridesmaids, find the perfect morning Muhurtham pick and all your other wedding festivities outfits from Sri Vijaylaxmi Silks.',
  },
]

export const instagramProfile = {
  ...business.social.instagram,
  profileImageAlt: 'Sri Vijaylaxmi Silks Instagram profile',
}

export default instagramPosts
