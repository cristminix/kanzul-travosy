import Hero from "../blocks/Hero"

import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"
import BeritaList from "../blocks/BeritaList"
import BeritaPager from "../blocks/BeritaPager"
const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Berita", path: "/berita" },
  ]
import {useState,useEffect} from "react"

const BeritaMainContent = ({ beritaData , model,reload}) => {
  // console.log(beritaData)
  const [list,setList] = useState([])
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(6)
  const updateList=async()=>{
    const newList = await model.getList(limit,page)
    console.log(newList)
    setList(oList=>newList)
  }
  useEffect(()=>{
    console.log(model.ready)
    if(model.ready)
      updateList()
  },[setList,reload])

  return (
    <>
      <BannerCrumb banner={beritaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">      
        <div className="container twx-relative">
          <BeritaList list={list} />
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