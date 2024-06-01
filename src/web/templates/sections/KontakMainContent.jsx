import Hero from "../blocks/Hero"

import FullKontak from "../blocks/FullKontak"
import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"

const KontakMainContent = ({ kontakData }) => {
  console.log(kontakData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Kontak", path: "/kontak" },
  ]
  return (
    <>
      <BannerCrumb banner={kontakData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullKontak className="mt-12" kontak={kontakData} />
      </section>
    </>
  )
}

export default KontakMainContent