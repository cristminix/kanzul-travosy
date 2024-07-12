import { useDispatch, useSelector } from "react-redux"
import { fetchBerita } from "@/global/store/features/beritaSlice"
import { fetchMetaBerita } from "@/global/store/features/metaSlice"

import BeritaMainContent from "@/web/templates/sections/BeritaMainContent"

import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const BeritaList = ({ model, reload, loadingModel, byAuthor }) => {
  const { author } = useLoaderData()

  const beritaState = useSelector((state) => state.berita)
  const dispatch = useDispatch()
  const meta = useSelector((state) => state.meta.berita)
  const BASE_URL = "https://www.ponpeskanzululumcirebon.com"
  const [canonical, setCanonical] = useState(`${BASE_URL}/berita/`)
  const [description, setDescription] = useState(meta["meta-description"])

  useEffect(() => {
    // console.log(byKategori, kategori)
    if (byAuthor && author) {
      setCanonical(`${BASE_URL}/berita/#/penulis/${author}`)
      setDescription(`${meta["meta-description"]} Oleh ${author}`)
    }
  }, [byAuthor, author, setCanonical, setDescription])

  useEffect(() => {
    dispatch(fetchBerita())
    dispatch(fetchMetaBerita())
  }, [dispatch])

  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>
      )}
      <BeritaMainContent
        byAuthor={byAuthor}
        beritaData={beritaState.data}
        loadingModel={loadingModel}
        reload={reload}
        model={model}
      />
    </>
  )
}

export default BeritaList
