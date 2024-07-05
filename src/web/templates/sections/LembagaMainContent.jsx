import Hero from "../blocks/Hero"

import FullLembaga from "../blocks/FullLembaga"
import BannerCrumb from "../blocks/BannerCrumb"
import SectionHeading from "../blocks/SectionHeading"

// import Counter from "@/global/store/features/counter/Counter"

const LembagaMainContent = ({ lembagaData }) => {
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Lembaga", path: "/lembaga" },
  ]
  return (
    <>
      <BannerCrumb banner={lembagaData.banner} breadcrumbs={breadcrumbs} />
      <SectionHeading
        className=""
        title="Lembaga Pendidikan"
        content="Lembaga Pendidikan Pondok Pesantren Kanzululum"
      />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">
        <FullLembaga className="mt-12" lembaga={lembagaData} />
      </section>
    </>
  )
}

export default LembagaMainContent
