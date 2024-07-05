import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchLembaga } from "@/global/store/features/lembagaSlice"
import { fetchMetaLembaga } from "@/global/store/features/metaSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import LembagaMainContent from "./sections/LembagaMainContent"
import { Helmet } from "react-helmet-async"

const LembagaTemplate = ({}) => {
  const dispatch = useDispatch()

  const lembagaState = useSelector((state) => state.lembaga)
  const meta = useSelector((state) => state.meta.lembaga)
  const BASE_URL = import.meta.env === "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"

  useEffect(() => {
    dispatch(fetchLembaga())
    dispatch(fetchMetaLembaga())
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
        <LembagaMainContent lembagaData={lembagaState.data} />
      </ColumnLayout>
    </>
  )
}

export default LembagaTemplate
