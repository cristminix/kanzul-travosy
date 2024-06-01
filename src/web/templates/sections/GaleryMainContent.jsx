import Hero from "../blocks/Hero"

import FullLembaga from "../blocks/FullLembaga"
import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"

const LembagaMainContent = ({ lembagaData }) => {
  console.log(lembagaData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Lembaga", path: "/lembaga" },
  ]
  return (
    <>
      <BannerCrumb banner={lembagaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullLembaga className="mt-12" lembaga={lembagaData} />
      </section>
    </>
  )
}

export default LembagaMainContent