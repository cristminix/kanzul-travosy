import Hero from "../blocks/Hero"
import WelcomeMessage from "../blocks/WelcomeMessage"
import ShortProfile from "../blocks/ShortProfile"
import ShortLembaga from "../blocks/ShortLembaga"
// import ShortGalery from "../blocks/ShortGalery"
import ShortGalerySlider from "../blocks/ShortGalerySlider"
import ShortBeritaList from "../blocks/ShortBeritaList"
import ShortProdukList from "../blocks/ShortProdukList"

// import Counter from "@/global/store/features/counter/Counter"

const HomepageMainContent = ({heroData, profileData, galeryList, produkList,beritaList, welcomeMessageData }) => {
  return (
    <>
      <Hero heroData={heroData}/>

      <section className="twx-relative md:twx-py-24 twx-py-16 twx-overflow-hidden">
        <WelcomeMessage welcomeMessageData={welcomeMessageData} />

        <ShortProfile profile={profileData} className="twx-mt-12" />
        <ShortLembaga />
        <ShortGalerySlider galeryList={galeryList} className="twx-mt-12" />
        <ShortBeritaList beritaList={beritaList} />
        <ShortProdukList produkList={produkList} />
      </section>
    </>
  )
}

export default HomepageMainContent
