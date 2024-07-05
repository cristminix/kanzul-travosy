import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchPendaftaran } from "@/global/store/features/pendaftaranSlice"
import { fetchMetaPendaftaran } from "@/global/store/features/metaSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import PendaftaranMainContent from "./sections/PendaftaranMainContent"
import { Helmet } from "react-helmet-async"

const PendaftaranTemplate = ({}) => {
  const dispatch = useDispatch()

  const pendaftaranState = useSelector((state) => state.pendaftaran)
  const meta = useSelector((state) => state.meta.pendaftaran)
  const BASE_URL = import.meta.env !== "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"

  useEffect(() => {
    dispatch(fetchPendaftaran())
    dispatch(fetchMetaPendaftaran())
    // feather.replace()
  }, [dispatch])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/pendaftaran/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <PendaftaranMainContent pendaftaranData={pendaftaranState.data} />
      </ColumnLayout>
    </>
  )
}

export default PendaftaranTemplate
