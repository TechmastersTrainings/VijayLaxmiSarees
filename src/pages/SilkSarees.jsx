import CollectionPage from './CollectionPage'
import FeatureSplit from '../components/home/FeatureSplit'
import kanchiImage from '../assets/products/kanchipuram-red-silver-brocade.jpg'

const story = (
  <FeatureSplit
    eyebrow="The silk edit"
    title="Weaves that carry a century of technique"
    description="Kanchipuram's signature broad border, Banarasi's handloom weight, and Venkatgiri's age-old kuttu technique — pure silk has been the heart of Sri Vijaylaxmi Silks in Bidar. Real silk should be handled with care, which is why our curated pieces note their wash care honestly."
    image={kanchiImage}
    imageAlt="Red Kanchipuram silk saree with antique silver brocade work"
    ctaLabel="Ask which weave suits the occasion"
    ctaTo="/contact"
    reverse
  />
)

export const SilkSarees = () => <CollectionPage slug="silk-sarees" story={story} />
export default SilkSarees