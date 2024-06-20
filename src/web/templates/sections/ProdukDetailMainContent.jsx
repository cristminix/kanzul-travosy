import Hero from "../blocks/Hero"

import FullProdukDetail from "../blocks/FullProdukDetail"
import ProdukBanner from "../blocks/ProdukBanner"
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {getBlocksReadingTime} from "@/global/fn/getBlocksReadingTime"
import moment from "moment" 
import {createDateFromSqlDateTime} from "@/global/fn/createDateFromSqlDateTime"

const ProdukDetailMainContent = ({ model,loadingModel,reload,metaMode }) => {
  const {id}=useLoaderData()
  const [pk,setPk]=useState(id)
  const [banner,setBanner] = useState({title:"",image:null})
  const [produk,setProduk] = useState(null)
  const [breadcrumbs,setBreadcrumbs] = useState([])
  const [loading,setLoading] = useState(loadingModel)
  
  const loadProdukDetail = async()=>{
    if(!pk){
      return
    }
    setLoading(true)
    const detail = await model.get(pk)
    
    try{detail.content = JSON.parse(detail.content)}catch(e){detail.content=[]}
    detail.readingTime = getBlocksReadingTime(detail.content)
    detail.tanggal = moment(createDateFromSqlDateTime(detail.dateCreated)).format('DD/MM/YYYY')
    const link = `${document.location.href}`
    detail.shareLink = encodeURIComponent(link)
    setProduk(oData=>({...oData,...detail}))
    const breadcrumbs = [
      { title: "Home", path: "/" },
      { title: "Produk", path: "/produk" },
      { title: detail.title, path: `#/baca/${detail.slug}` },
    ]
    setBreadcrumbs(oData=>([...breadcrumbs]))
    setBanner(oData=>({...oData, title:detail.title,image:`/assets/images/produk/covers/${detail.cover}`}))
    setLoading(false)

  }

  const getPkByMeta=()=>{
    const meta = document.querySelector("meta[name=id]")
    const id = meta.getAttribute("content")
    if(id){
      setPk(id)
    }
    // console.log(meta.getAttribute("content"))
  }

  useEffect(()=>{
    if(model.ready)
      loadProdukDetail()
  },[pk,setProduk,reload,setLoading])

  useEffect(()=>{
    if(metaMode){
      getPkByMeta()
    }
  },[metaMode,setPk])
  return (
    <>
      <ProdukBanner banner={banner} breadcrumbs={breadcrumbs} produk={produk}/>
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullProdukDetail metaMode={metaMode} className="mt-12" produk={produk} loading={loading} />
      </section>
    </>
  )
}

export default ProdukDetailMainContent