import Hero from "../blocks/Hero"

import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"
import BeritaList from "../blocks/BeritaList"
import BeritaPager from "../blocks/BeritaPager"
const BeritaMainContent = ({ beritaData }) => {
  // console.log(beritaData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Berita", path: "/berita" },
  ]
  return (
    <>
      <BannerCrumb banner={beritaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">      
        <div className="container twx-relative">
          <BeritaList beritaData={beritaData} />
          <BeritaPager />
          {/*<section className="relative md:py-24 py-16 overflow-hidden">
        <FullBerita className="mt-12" berita={beritaData} />
      </section>*/}
        </div>
      </section>
    </>
  )
}

export default BeritaMainContent