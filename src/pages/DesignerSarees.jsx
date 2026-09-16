import CollectionPage from './CollectionPage'
import FeatureSplit from '../components/home/FeatureSplit'
import tissueImage from '../assets/products/stylish-tissue-kanchipuram.jpg'

const story = (
  <FeatureSplit
    eyebrow="The designer edit"
    title="A modern drape for every celebration"
    description="Tissue Kanchipuram with 3D texture, turquoise Venkatgiri pattu, embroidered georgette — designer drapes that move from daytime events to evening parties with ease. If you're choosing between weaves, we'll help you pick the right drape for the occasion."
    image={tissueImage}
    imageAlt="Turquoise Tissue Kanchipuram silk saree with 3D work and maroon kuttu border"
    ctaLabel="Get styling advice on WhatsApp"
    ctaTo="/contact"
    ctaVariant="gold"
  />
)

export const DesignerSarees = () => <CollectionPage slug="designer-sarees" story={story} />
export default DesignerSarees