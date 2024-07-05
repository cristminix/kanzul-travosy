import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchKontak } from "@/global/store/features/kontakSlice"
import { fetchCompany } from "@/global/store/features/companySlice"
import { fetchMetaKontak } from "@/global/store/features/metaSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import KontakMainContent from "./sections/KontakMainContent"
import { Helmet } from "react-helmet-async"

const KontakTemplate = ({}) => {
  const dispatch = useDispatch()

  const kontakState = useSelector((state) => state.kontak)
  const companyState = useSelector((state) => state.company)
  const meta = useSelector((state) => state.meta.kontak)
  const BASE_URL = import.meta.env === "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"

  // console.log(kontakState)
  useEffect(() => {
    dispatch(fetchKontak())
    dispatch(fetchMetaKontak())
    dispatch(fetchCompany())

    feather.replace()
  }, [dispatch])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/lembaga/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <KontakMainContent companyData={companyState.data} kontakData={kontakState.data} />
      </ColumnLayout>
    </>
  )
}

export default KontakTemplate
