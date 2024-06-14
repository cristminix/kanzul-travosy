import Hero from "../blocks/Hero"

import FullGalery from "../blocks/FullGalery"
import BannerCrumb from "../blocks/BannerCrumb"
import SectionHeading from '../blocks/SectionHeading';

// import Counter from "@/global/store/features/counter/Counter"

const GaleryMainContent = ({ galeryData }) => {
  // console.log(galeryData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Galeri", path: "/galeri" },
  ]
  return (
    <>
      <BannerCrumb banner={galeryData.banner} breadcrumbs={breadcrumbs} />
      <SectionHeading className="" title="Galeri" content="Galeri Foto Pondok Pesantren Kanzululum" />

      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullGalery className="mt-12" galery={galeryData} />
      </section>
    </>
  )
}

export default GaleryMainContent