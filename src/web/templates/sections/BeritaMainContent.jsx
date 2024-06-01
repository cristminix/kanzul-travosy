import Hero from "../blocks/Hero"

import FullBerita from "../blocks/FullBerita"
import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"

const BeritaMainContent = ({ beritaData }) => {
  console.log(beritaData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Berita", path: "/berita" },
  ]
  return (
    <>
      <BannerCrumb banner={beritaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullBerita className="mt-12" berita={beritaData} />
      </section>
    </>
  )
}

export default BeritaMainContent