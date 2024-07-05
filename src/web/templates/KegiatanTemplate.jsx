import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchKegiatan } from "@/global/store/features/kegiatanSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import KegiatanMainContent from "./sections/KegiatanMainContent"
import { fetchMetaKegiatan } from "@/global/store/features/metaSlice"
import { Helmet } from "react-helmet-async"

const KegiatanTemplate = ({}) => {
  const dispatch = useDispatch()

  const kegiatanState = useSelector((state) => state.kegiatan)
  const meta = useSelector((state) => state.meta.kegiatan)
  const BASE_URL = import.meta.env !== "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"

  useEffect(() => {
    dispatch(fetchKegiatan())
    dispatch(fetchMetaKegiatan())
    feather.replace()
  }, [dispatch])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/kegiatan/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <KegiatanMainContent kegiatanData={kegiatanState.data} />
      </ColumnLayout>
    </>
  )
}

export default KegiatanTemplate
