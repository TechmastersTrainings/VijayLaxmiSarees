/**
 * Verified business information for Sri Vijaylaxmi Silks, Bidar.
 *
 * Every value in this file is drawn from the business's public presence
 * (Instagram @srivijaylaxmisilks, YouTube @srivijaylaxmisilks, and public
 * local listings). Where a value could not be confidently verified it is
 * marked with `needsConfirmation: true` so it can be replaced by the
 * business before launch. Nothing here is invented.
 */

export const business = {
  name: 'Sri Vijaylaxmi Silks',
  shortName: 'SVS',
  city: 'Bidar',
  state: 'Karnataka',
  country: 'India',

  // Used in meta titles and the hero.
  tagline: 'Silk sarees, designer drapes & wedding wear',
  locality: 'Near Papnash Gate, Shiva Nagar, Bidar',

  // Public Instagram bio line: "Sri Vijaylaxmi Silks - Near Papnash Gate, Shivnagar, Bidar."
  intro:
    'At Sri Vijaylaxmi Silks, our collection is designed for everyone — mothers, grandmothers, aunts and sisters — ensuring every member of the family feels beautiful and special on the big day. From timeless Kanchipuram to luxurious Banarasis, we have something for every occasion.',

  address: {
    line1: 'Shivam Complex, Main Gate',
    line2: 'Opp. Papnash, Havappa Layout, Shiva Nagar',
    city: 'Bidar',
    state: 'Karnataka',
    postalCode: '585401',
    country: 'India',
    // Single-line form for maps, schema and WhatsApp messages.
    full:
      'Sri Vijaylaxmi Silks, Shivam Complex, Main Gate, Opp. Papnash, Havappa Layout, Shiva Nagar, Bidar, Karnataka 585401',
    // Verified against the business's public local listings.
    needsConfirmation: false,
  },

  contact: {
    // Listed for the business on public local directories and treated as the
    // store contact number. To be confirmed by the owner before launch.
    phoneDisplay: '+91 97383 49190',
    phoneE164: '919738349190',
    whatsapp: '919738349190',
    needsConfirmation: true,
  },

  hours: {
    // As listed publicly. Shown with a "confirm on WhatsApp" note in the UI.
    summary: 'Open all days · 9:30 AM – 9:30 PM',
    needsConfirmation: true,
  },

  social: {
    instagram: {
      handle: '@srivijaylaxmisilks',
      url: 'https://www.instagram.com/srivijaylaxmisilks/',
      posts: '3,172+ posts',
      followers: '28K followers',
      following: '191 following',
    },
    youtube: {
      handle: '@srivijaylaxmisilks',
      url: 'https://www.youtube.com/@srivijaylaxmisilks',
      subscribers: '1,230 subscribers',
      videos: 5,
    },
  },

  // Product families the business publicly identifies with.
  categories: [
    'Kanchipuram Silk',
    'Banarasi Silk',
    'Venkatgiri Tissue',
    'Designer Sarees',
    'Paithani',
    'Chanderi',
    'Organza',
    'Cotton & Linen',
    'Bridal Lehenga',
    'Wedding Wear',
  ],

  // Shown in the footer / contact page as the sources behind the content.
  sources: [
    { label: 'Instagram', url: 'https://www.instagram.com/srivijaylaxmisilks/' },
    { label: 'YouTube', url: 'https://www.youtube.com/@srivijaylaxmisilks' },
  ],
}

export const whatsappMessage = (text) =>
  `https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent(text)}`

export default business
