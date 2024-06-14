import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import galerySlice, { fetchGalery } from "@/global/store/features/galerySlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import GaleryMainContent from "./sections/GaleryMainContent"

const GaleryTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const galeryState = useSelector((state) => state.galery)
  // console.log(galeryState)
  useEffect(() => {
  
    dispatch(fetchGalery())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <GaleryMainContent galeryData={galeryState.data} />
    </ColumnLayout>
  )
}

export default GaleryTemplate
