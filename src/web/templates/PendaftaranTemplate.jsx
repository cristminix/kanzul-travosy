import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import lembagaSlice, { fetchLembaga } from "@/global/store/features/lembagaSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import LembagaMainContent from "./sections/LembagaMainContent"

const LembagaTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const lembagaState = useSelector((state) => state.lembaga)
  console.log(lembagaState)
  useEffect(() => {
  
    dispatch(fetchLembaga())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <LembagaMainContent lembagaData={lembagaState.data} />
    </ColumnLayout>
  )
}

export default LembagaTemplate
