import Hero from "../blocks/Hero"
import WelcomeMessage from "../blocks/WelcomeMessage"
import ShortProfile from "../blocks/ShortProfile"
import ShortLembaga from "../blocks/ShortLembaga"
// import ShortGalery from "../blocks/ShortGalery"
import ShortGalerySlider from "../blocks/ShortGalerySlider"
import ShortBeritaList from "../blocks/ShortBeritaList"

// import Counter from "@/global/store/features/counter/Counter"

const HomepageMainContent = ({ galeryList, beritaList }) => {
  return (
    <>
      <Hero />

      <section className="relative md:py-24 py-16 overflow-hidden">
        <WelcomeMessage />

        <ShortProfile className="mt-12" />
        <ShortLembaga />
        <ShortGalerySlider galeryList={galeryList} />
        <ShortBeritaList beritaList={beritaList} />
      </section>
    </>
  )
}

export default HomepageMainContent
