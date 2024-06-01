import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import kontakSlice, { fetchKontak } from "@/global/store/features/kontakSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import KontakMainContent from "./sections/KontakMainContent"

const KontakTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const kontakState = useSelector((state) => state.kontak)
  console.log(kontakState)
  useEffect(() => {
  
    dispatch(fetchKontak())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <KontakMainContent kontakData={kontakState.data} />
    </ColumnLayout>
  )
}

export default KontakTemplate
