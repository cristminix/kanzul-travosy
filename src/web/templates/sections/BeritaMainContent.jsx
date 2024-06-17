
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
import {useLoaderData} from "react-router-dom"

const BeritaMainContent = ({ beritaData , model,reload,loadingModel}) => {
  const {pageNumber} = useLoaderData()
  // console.log(beritaData)
  const [list,setList] = useState([])
  const [loading,setLoading] = useState(loadingModel)
  // const [page,setPage] = useState(pageNumber||1)
  const [limit,setLimit] = useState(6)
  const [pager,setPager] = useState({
    page:1,limit,totalPages:0,totalRecords:0
  })

  const updateList=async(pageNumber)=>{
    setLoading(true)
    const page = parseInt(pageNumber||1)
    const newList = await model.getList(limit,page)
    console.log(newList)
    setList(oList=>newList)
    setPager(oPager=>({
      ...oPager,limit,page,
      totalRecords:newList.totalRecords,
      totalPages:newList.totalPages
    }))
    setLoading(false)
  }
  useEffect(()=>{
    // console.log(model.ready,{pageNumber})

    if(model && model.ready)
      updateList(pageNumber)
  },[setList,reload,setPager,pageNumber,setLoading])

  return (
    <>
      <BannerCrumb banner={beritaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">      
        <div className="container twx-relative">
          <BeritaList list={list} loading={loading}/>
          <BeritaPager pager={pager} loading={loading}/>
          {/*<section className="relative md:py-24 py-16 overflow-hidden">
        <FullBerita className="mt-12" berita={beritaData} />
      </section>*/}
        </div>
      </section>
    </>
  )
}

export default BeritaMainContent