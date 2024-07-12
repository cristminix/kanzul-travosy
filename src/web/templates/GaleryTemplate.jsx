import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchGalery } from "@/global/store/features/galerySlice"
import { fetchMetaGalery } from "@/global/store/features/metaSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import GaleryMainContent from "./sections/GaleryMainContent"
import { Helmet } from "react-helmet-async"

const GaleryTemplate = ({}) => {
  const dispatch = useDispatch()

  const galeryState = useSelector((state) => state.galery)
  const meta = useSelector((state) => state.meta.galery)
  const BASE_URL = "https://www.ponpeskanzululumcirebon.com"

  useEffect(() => {
    dispatch(fetchGalery())
    dispatch(fetchMetaGalery())
    feather.replace()
  }, [dispatch])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/galeri/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <GaleryMainContent galeryData={galeryState.data} />
      </ColumnLayout>
    </>
  )
}

export default GaleryTemplate
