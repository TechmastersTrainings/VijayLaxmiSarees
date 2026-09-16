import kanchipuramRed from '../assets/products/kanchipuram-red-silver-brocade.jpg'
import khaddiBanarasi from '../assets/products/khaddi-banarasi-silk.jpg'
import blueSeaGreen from '../assets/products/blue-sea-green-kanchi.jpg'
import venkatgiri from '../assets/products/venkatgiri-tissue-pattu.jpg'
import bridalPureSilk from '../assets/products/bridal-pure-silk.jpg'
import plainPurple from '../assets/products/plain-purple-embroidered.jpg'
import stylishTissue from '../assets/products/stylish-tissue-kanchipuram.jpg'

/**
 * The product catalogue below contains ONLY sarees that Sri Vijaylaxmi Silks
 * has published publicly with a photograph, a name and (where shown) a listed
 * price. Descriptions reuse the business's own published product copy.
 *
 * `price` is the price the business has listed publicly for the piece.
 * `priceVerified` is false because a public directory listing is not a
 * confirmed, real-time retail price. The UI labels these values honestly and
 * always offers "confirm price" on WhatsApp.
 *
 * No ratings, reviews, stock counts or invented discounts appear anywhere.
 */

export const products = [
  {
    id: 'kanchipuram-red-silver-brocade',
    name: 'Kanchipuram Red Silk Saree With Silver Brocade',
    category: 'Silk Sarees',
    weave: 'Kanchipuram',
    fabric: 'Pure Silk',
    colour: ['Red'],
    occasion: ['Bridal', 'Wedding', 'Festive'],
    collections: ['silk-sarees', 'wedding'],
    price: 11000,
    priceVerified: false,
    image: kanchipuramRed,
    imageAlt:
      'Red Kanchipuram silk saree with antique silver brocade work, styled for bridal and festive wear',
    description:
      'A traditional red Kanchipuram adorned in sleek vertical lines in an antique silver tone. The silver brocade pattern that runs across the drape is intricately traditional, making the weave a perfect pick for auspicious and bridal festivities.',
    details: {
      Colour: 'Red',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      'Silk type': 'Pure silk',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'pure-handwoven-khaddi-banarasi',
    name: 'Pure Handwoven Khaddi Banarasi Silk Saree',
    category: 'Silk Sarees',
    weave: 'Banarasi',
    fabric: 'Pure Silk',
    colour: ['Red'],
    occasion: ['Wedding', 'Festive', 'Party'],
    collections: ['silk-sarees'],
    price: 11045,
    priceVerified: false,
    image: khaddiBanarasi,
    imageAlt: 'Red pure handwoven Khaddi Banarasi silk saree with traditional woven motifs',
    description:
      'A pure handwoven Khaddi Banarasi silk saree in classic red, carrying the weight and sheen of true handloom Banaras weaving.',
    details: {
      Colour: 'Red',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      'Silk type': 'Pure silk',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'blue-sea-green-kanchi-silk',
    name: 'Blue & Sea Green Kanchi Silk Saree',
    category: 'Silk Sarees',
    weave: 'Kanchipuram',
    fabric: 'Pure Silk',
    colour: ['Blue', 'Green'],
    occasion: ['Wedding', 'Pre-wedding', 'Festive'],
    collections: ['silk-sarees', 'wedding'],
    price: 11550,
    priceVerified: false,
    image: blueSeaGreen,
    imageAlt: 'Azure blue and sea green Kanchipuram silk saree with gold brocade',
    description:
      'The shades of azure blue and sea green look alluring together on this Kanchipuram drape with gold brocade — a versatile pick that suits pre-wedding rituals and multiple other occasions.',
    details: {
      Colour: 'Blue, Green',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      'Silk type': 'Pure silk',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'venkatgiri-tissue-pattu',
    name: 'Venkatgiri Tissue Pattu Silk Saree',
    category: 'Silk Sarees',
    weave: 'Venkatgiri',
    fabric: 'Tissue Silk',
    colour: ['Blue', 'Purple'],
    occasion: ['Wedding', 'Festive', 'Party'],
    collections: ['silk-sarees', 'designer-sarees', 'wedding'],
    price: 11000,
    priceVerified: false,
    image: venkatgiri,
    imageAlt: 'Turquoise and purple Venkatgiri tissue pattu silk saree with kuttu border',
    description:
      'Venkatgiri Tissue Pattu in dazzling shades of turquoise and purple to brighten up your occasion. This drape is made with a technique used for over 100 years, making it exclusive with its kuttu border.',
    details: {
      Colour: 'Blue, Purple',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      Pattern: 'Weaving',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'bridal-pure-silk-saree',
    name: 'Bridal Pure Silk Saree',
    category: 'Wedding Wear',
    weave: 'Pure Silk',
    fabric: 'Pure Silk',
    colour: ['Pink', 'Gold'],
    occasion: ['Bridal', 'Wedding'],
    collections: ['wedding', 'silk-sarees', 'new-arrivals'],
    price: 11000,
    priceVerified: false,
    image: bridalPureSilk,
    imageAlt: 'Bridal pure silk saree in dual pink and gold hues with intricate traditional motifs',
    description:
      'Bridal season is on in full swing! This golden saree in dual hues of pink and gold with intricate traditional motifs looks grand and royal — every saree has its own story to say.',
    details: {
      Colour: 'Pink, Gold',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      'Silk type': 'Pure silk',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'stylish-tissue-kanchipuram',
    name: 'Stylish Tissue Kanchipuram Silk Saree',
    category: 'Designer Sarees',
    weave: 'Kanchipuram',
    fabric: 'Tissue Silk',
    colour: ['Turquoise', 'Maroon'],
    occasion: ['Party', 'Festive', 'Wedding'],
    collections: ['designer-sarees', 'silk-sarees', 'new-arrivals'],
    price: 11500,
    priceVerified: false,
    image: stylishTissue,
    imageAlt:
      'Turquoise Tissue Kanchipuram silk saree with 3D work and a contrasting dark maroon kuttu border',
    description:
      'An astoundingly gorgeous turquoise Tissue Kanchipuram drape with 3D work all over that gives it a rich texture. The contrasting dark maroon kuttu border increases the charm of the overall look — perfect for both casual and formal occasions, at any time of the day.',
    details: {
      Colour: 'Turquoise, Maroon',
      Length: '5.5 mtr',
      Blouse: 'Yes',
      'Silk type': 'Pure silk',
      'Wash care': 'Machine wash, hand wash',
    },
  },
  {
    id: 'plain-purple-embroidered-blouse',
    name: 'Plain Purple Saree With Embroidered Blouse',
    category: 'Designer Sarees',
    weave: 'Georgette',
    fabric: 'Georgette',
    colour: ['Purple'],
    occasion: ['Party', 'Festive'],
    collections: ['designer-sarees', 'new-arrivals'],
    price: 1199,
    priceVerified: false,
    image: plainPurple,
    imageAlt: 'Plain purple georgette saree paired with an embroidered blouse',
    description:
      'A plain purple georgette drape paired with an embroidered blouse — an easy, elegant choice for festive and party occasions.',
    details: {
      Colour: 'Purple',
      Length: '5.5 mtr',
      Blouse: 'Yes, embroidered',
      Fabric: 'Georgette',
      'Wash care': 'Machine wash, hand wash',
    },
  },
]

export const getProductById = (id) => products.find((p) => p.id === id)

export const getProductsByCollection = (slug) =>
  products.filter((p) => p.collections.includes(slug))

export const relatedProducts = (product, limit = 4) => {
  if (!product) return []
  const scored = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0
      if (p.weave === product.weave) score += 2
      if (p.category === product.category) score += 2
      if (p.colour.some((c) => product.colour.includes(c))) score += 1
      return { p, score }
    })
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.p)
}

// Facets are derived from real metadata only, so filters never offer empty values.
export const getAllColours = () =>
  [...new Set(products.flatMap((p) => p.colour))].sort()

export const getAllWeaves = () =>
  [...new Set(products.map((p) => p.weave))].sort()

export const getAllCategories = () =>
  [...new Set(products.map((p) => p.category))].sort()

export const getPriceBounds = () => {
  const prices = products.map((p) => p.price).filter(Boolean)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export default products
