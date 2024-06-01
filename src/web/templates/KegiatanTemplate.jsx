import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import kegiatanSlice, { fetchKegiatan } from "@/global/store/features/kegiatanSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import KegiatanMainContent from "./sections/KegiatanMainContent"

const KegiatanTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const kegiatanState = useSelector((state) => state.kegiatan)
  console.log(kegiatanState)
  useEffect(() => {
  
    dispatch(fetchKegiatan())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <KegiatanMainContent kegiatanData={kegiatanState.data} />
    </ColumnLayout>
  )
}

export default KegiatanTemplate
