import Hero from "../blocks/Hero"

import FullKegiatan from "../blocks/FullKegiatan"
import BannerCrumb from "../blocks/BannerCrumb"
import SectionHeading from "../blocks/SectionHeading"


// import Counter from "@/global/store/features/counter/Counter"

const KegiatanMainContent = ({ kegiatanData }) => {
  console.log(kegiatanData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Kegiatan", path: "/kegiatan" },
  ]
  return (
    <>
      <BannerCrumb banner={kegiatanData.banner} breadcrumbs={breadcrumbs} />
      <SectionHeading className="" title="Kegiatan" content="Jadwal Waktu Kegiatan Pondok Pesantren Kanzululum" />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">
        <FullKegiatan className="mt-12" kegiatan={kegiatanData} />
      </section>
    </>
  )
}

export default KegiatanMainContent