import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchKontak } from "@/global/store/features/kontakSlice"
import { fetchCompany } from "@/global/store/features/companySlice"

import ColumnLayout from "./layouts/ColumnLayout"
import KontakMainContent from "./sections/KontakMainContent"

const KontakTemplate = ({}) => {
  const dispatch = useDispatch()

  const kontakState = useSelector((state) => state.kontak)
  const companyState = useSelector((state) => state.company)

  // console.log(kontakState)
  useEffect(() => {
    dispatch(fetchKontak())
    dispatch(fetchCompany())

    feather.replace()
  }, [dispatch])
  return (
    <ColumnLayout>
      <KontakMainContent companyData={companyState.data} kontakData={kontakState.data} />
    </ColumnLayout>
  )
}

export default KontakTemplate
