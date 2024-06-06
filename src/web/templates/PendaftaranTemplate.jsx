import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import pendaftaranSlice, { fetchPendaftaran } from "@/global/store/features/pendaftaranSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import PendaftaranMainContent from "./sections/PendaftaranMainContent"

const PendaftaranTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const pendaftaranState = useSelector((state) => state.pendaftaran)
  console.log(pendaftaranState)
  useEffect(() => {
  
    dispatch(fetchPendaftaran())
    // feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <PendaftaranMainContent pendaftaranData={pendaftaranState.data} />
    </ColumnLayout>
  )
}

export default PendaftaranTemplate
