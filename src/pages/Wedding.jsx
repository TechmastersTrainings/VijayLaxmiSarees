import CollectionPage from './CollectionPage'
import FeatureSplit from '../components/home/FeatureSplit'
import bridalImage from '../assets/products/bridal-pure-silk.jpg'

const story = (
  <FeatureSplit
    eyebrow="The wedding edit"
    title="Dressing the whole family for the big day"
    description="Weddings are a family occasion, and our collection celebrates that. From the bride's trousseau to the grandmother's classic Kanchipuram, every saree in this edit is chosen for the roles that make an Indian wedding memorable."
    quote="Bridal season is on in full swing. Every saree has its own story to say."
    image={bridalImage}
    imageAlt="Bridal pure silk saree in pink and gold with intricate traditional motifs"
    ctaLabel="Ask about bridal bookings"
    ctaTo="/contact"
  />
)

export const Wedding = () => <CollectionPage slug="wedding" story={story} />
export default Wedding