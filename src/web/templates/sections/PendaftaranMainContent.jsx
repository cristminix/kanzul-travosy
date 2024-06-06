import Hero from "../blocks/Hero"

import FullPendaftaran from "../blocks/FullPendaftaran"
import BannerCrumb from "../blocks/BannerCrumb"
import BiayaPendaftaran from "../blocks/BiayaPendaftaran"
// import Counter from "@/global/store/features/counter/Counter"

const PendaftaranMainContent = ({ pendaftaranData }) => {
  console.log(pendaftaranData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Pendaftaran", path: "/pendaftaran" },
  ]
  return (
    <>
      <BannerCrumb banner={pendaftaranData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullPendaftaran className="mt-12" pendaftaran={pendaftaranData} />
        <BiayaPendaftaran pendaftaran={pendaftaranData}/>
      </section>
    </>
  )
}

export default PendaftaranMainContent