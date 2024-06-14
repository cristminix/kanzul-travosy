import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"

import ColumnLayout from "@/web/templates/layouts/ColumnLayout" 
import BeritaMainContent from "@/web/templates/sections/BeritaMainContent"

const loader = async()=>{
	return null
}
const BeritaApp = ({})=>{
	 const dispatch = useDispatch()

  const beritaState = useSelector((state) => state.berita)
  // console.log(beritaState)
  useEffect(() => {
  
    dispatch(fetchBerita())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <BeritaMainContent beritaData={beritaState.data} />
    </ColumnLayout>
  )
}

export {loader}
export default BeritaApp