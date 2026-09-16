import bridalPureSilk from '../assets/products/bridal-pure-silk.jpg'
import kanchipuramRed from '../assets/products/kanchipuram-red-silver-brocade.jpg'
import stylishTissue from '../assets/products/stylish-tissue-kanchipuram.jpg'
import khaddiBanarasi from '../assets/products/khaddi-banarasi-silk.jpg'
import plainPurple from '../assets/products/plain-purple-embroidered.jpg'

/**
 * Collection pages are built only from sarees the business has published.
 * Copy avoids any invented history, awards or claims.
 */

export const collections = [
  {
    slug: 'wedding',
    path: '/wedding',
    title: 'Wedding Collection',
    kicker: 'For the whole family',
    short: 'Bridal and family wedding wear',
    description:
      'From timeless Kanchipuram to luxurious Banarasis — a wedding wardrobe designed for mothers, grandmothers, aunts and sisters, so every member of the family feels beautiful and special on the big day.',
    heroImage: bridalPureSilk,
    heroAlt: 'Bridal pure silk saree in pink and gold from Sri Vijaylaxmi Silks',
  },
  {
    slug: 'silk-sarees',
    path: '/silk-sarees',
    title: 'Silk Sarees',
    kicker: 'Handloom & pure silk',
    short: 'Kanchipuram, Banarasi, Venkatgiri silk',
    description:
      'Kanchipuram, Banarasi, Venkatgiri tissue and pure silk drapes — the weaves Sri Vijaylaxmi Silks is known for in Bidar.',
    heroImage: kanchipuramRed,
    heroAlt: 'Red Kanchipuram silk saree with silver brocade from Sri Vijaylaxmi Silks',
  },
  {
    slug: 'designer-sarees',
    path: '/designer-sarees',
    title: 'Designer Sarees',
    kicker: 'Modern drapes',
    short: 'Tissue, georgette & contemporary weaves',
    description:
      'Contemporary tissue, georgette and designer drapes for parties, festivities and modern celebrations.',
    heroImage: stylishTissue,
    heroAlt: 'Turquoise Tissue Kanchipuram designer saree with 3D work',
  },
  {
    slug: 'new-arrivals',
    path: '/new-arrivals',
    title: 'New Arrivals',
    kicker: 'Freshly featured',
    short: 'Latest pieces from the store',
    description:
      'The latest sarees and wedding wear we are currently featuring across our Instagram and YouTube. Availability changes quickly — message us on WhatsApp for the newest stock.',
    heroImage: plainPurple,
    heroAlt: 'Newly featured purple saree with embroidered blouse',
  },
]

export const getCollection = (slug) => collections.find((c) => c.slug === slug)

export const featuredProducts = [khaddiBanarasi]

export default collections
