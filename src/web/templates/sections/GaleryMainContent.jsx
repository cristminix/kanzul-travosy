import Hero from "../blocks/Hero"

import FullGalery from "../blocks/FullGalery"
import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"

const GaleryMainContent = ({ galeryData }) => {
  console.log(galeryData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Galery", path: "/galery" },
  ]
  return (
    <>
      <BannerCrumb banner={galeryData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullGalery className="mt-12" galery={galeryData} />
      </section>
    </>
  )
}

export default GaleryMainContent