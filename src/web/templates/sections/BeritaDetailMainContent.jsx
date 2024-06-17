import Hero from "../blocks/Hero"

import FullBeritaDetail from "../blocks/FullBeritaDetail"
import BeritaBanner from "../blocks/BeritaBanner"
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {getBlocksReadingTime} from "@/global/fn/getBlocksReadingTime"
import moment from "moment" 
import {createDateFromSqlDateTime} from "@/global/fn/createDateFromSqlDateTime"

const BeritaDetailMainContent = ({ model,loadingModel,reload }) => {
  const {id}=useLoaderData()
  const [banner,setBanner] = useState({title:"",image:null})
  const [berita,setBerita] = useState(null)
  const [breadcrumbs,setBreadcrumbs] = useState([])
  const [loading,setLoading] = useState(loadingModel)
  
  const loadBeritaDetail = async()=>{
    setLoading(true)
    const detail = await model.get(id)
    
    try{detail.content = JSON.parse(detail.content)}catch(e){detail.content=[]}
    detail.readingTime = getBlocksReadingTime(detail.content)
    detail.tanggal = moment(createDateFromSqlDateTime(detail.dateCreated)).format('DD/MM/YYYY')
    const link = `${document.location.href}`
    detail.shareLink = encodeURIComponent(link)
    setBerita(oData=>({...oData,...detail}))
    const breadcrumbs = [
      { title: "Home", path: "/" },
      { title: "Berita", path: "/berita" },
      { title: detail.title, path: `#/baca/${detail.slug}` },
    ]
    setBreadcrumbs(oData=>([...breadcrumbs]))
    setBanner(oData=>({...oData, title:detail.title,image:`/assets/images/berita/covers/${detail.cover}`}))
    setLoading(false)

  }
  useEffect(()=>{
    if(model.ready)
      loadBeritaDetail()
  },[id,setBerita,reload,setLoading])
  return (
    <>
      <BeritaBanner banner={banner} breadcrumbs={breadcrumbs} berita={berita}/>
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullBeritaDetail className="mt-12" berita={berita} loading={loading} />
      </section>
    </>
  )
}

export default BeritaDetailMainContent