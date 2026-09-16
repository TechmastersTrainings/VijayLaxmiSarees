import { useSeo } from '../hooks/useSeo'
import { business } from '../data/business'
import Hero from '../components/home/Hero'
import CollectionShowcase from '../components/home/CollectionShowcase'
import FeaturedProducts from '../components/home/FeaturedProducts'
import FeatureSplit from '../components/home/FeatureSplit'
import InstagramShowcase from '../components/social/InstagramShowcase'
import YouTubeShowcase from '../components/social/YouTubeShowcase'
import StoreExperience from '../components/home/StoreExperience'
import ContactCta from '../components/home/ContactCta'
import bridalImage from '../assets/products/bridal-pure-silk.jpg'
import kanchiImage from '../assets/products/kanchipuram-red-silver-brocade.jpg'
import designerImage from '../assets/products/stylish-tissue-kanchipuram.jpg'

export const Home = () => {
  useSeo({
    title: undefined,
    description:
      'Sri Vijaylaxmi Silks, Bidar — Kanchipuram, Banarasi, Venkatgiri and designer silk sarees, bridal and wedding wear near Papnash Gate, Shiva Nagar. Premium saree shopping in North Karnataka.',
    path: '/',
    image: kanchiImage,
    jsonLd: {
      '@context': 'https://schema.org/',
      '@type': 'Store',
      name: business.name,
      description: business.intro,
      url: `${window.location.origin}/`,
      telephone: business.contact.phoneDisplay,
      openingHours: 'Mo-Su 09:30-21:30',
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${business.address.line1}, ${business.address.line2}`,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.postalCode,
        addressCountry: 'IN',
      },
      sameAs: [business.social.instagram.url, business.social.youtube.url],
    },
  })

  return (
    <>
      <Hero />
      <CollectionShowcase />
      <FeaturedProducts />

      <FeatureSplit
        eyebrow="The wedding edit"
        title="Wedding wardrobes for the whole family"
        description="Bridal season is on in full swing. Our wedding collection is designed for mothers, grandmothers, aunts and sisters — so every member of the family feels beautiful and special on the big day."
        quote="Every saree has its own story to say."
        image={bridalImage}
        imageAlt="Bridal pure silk saree in pink and gold with traditional motifs"
        ctaLabel="Explore Wedding Collection"
        ctaTo="/wedding"
      />

      <FeatureSplit
        eyebrow="The silk edit"
        title="Kanchipuram, Banarasi & Venkatgiri silk"
        description="From timeless Kanchipuram in antique silver brocade to handwoven Khaddi Banarasi in classic red — the pure-silk weaves Sri Vijaylaxmi Silks is known for in Bidar."
        image={kanchiImage}
        imageAlt="Red Kanchipuram silk saree with silver brocade"
        ctaLabel="Shop Silk Sarees"
        ctaTo="/silk-sarees"
        reverse
      />

      <FeatureSplit
        eyebrow="The designer edit"
        title="Contemporary designer drapes"
        description="Tissue Kanchipuram with rich 3D texture, turquoise and purple Venkatgiri pattu, embroidered georgette — modern drapes for parties and celebrations."
        image={designerImage}
        imageAlt="Turquoise Tissue Kanchipuram silk saree with 3D work and maroon border"
        ctaLabel="Shop Designer Sarees"
        ctaTo="/designer-sarees"
        ctaVariant="gold"
      />

      <InstagramShowcase />
      <YouTubeShowcase />
      <StoreExperience />
      <ContactCta />
    </>
  )
}

export default Home