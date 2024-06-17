import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"

import ColumnLayout from "@/web/templates/layouts/ColumnLayout" 
import BeritaMainContent from "@/web/templates/sections/BeritaMainContent"
import MBeritaRo from "@/global/git/orm/ro/models/MBeritaRo"
import {crc32id} from "@/global/fn/crc32id"
const mBeritaRo = new MBeritaRo()
console.log(mBeritaRo)
const loader = async()=>{
	return null
}
const BeritaApp = ({})=>{
	 const dispatch = useDispatch()

  const beritaState = useSelector((state) => state.berita)
  // console.log(beritaState)
  const [reload,setReload]=useState()
  const initModel= async()=>{
    await mBeritaRo.initOrm()
    setReload(crc32id())
    // const data = await mBeritaRo.getList()
    // console.log(data)
  }
  useEffect(() => {
    initModel()
    // dispatch(fetchBerita())
    feather.replace()

  }, [dispatch,setReload])
  return (
    <ColumnLayout>
      <BeritaMainContent reload={reload} model={mBeritaRo} beritaData={beritaState.data} />
    </ColumnLayout>
  )
}

export {loader}
export default BeritaApp