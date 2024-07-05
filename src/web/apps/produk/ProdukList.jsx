import { useDispatch, useSelector } from "react-redux"
import { fetchProduk } from "@/global/store/features/produkSlice"

import ProdukMainContent from "@/web/templates/sections/ProdukMainContent"
import { fetchMetaProduk } from "@/global/store/features/metaSlice"

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useLoaderData } from "react-router-dom"

const ProdukList = ({ model, reload, loadingModel, byKategori }) => {
  const { kategori } = useLoaderData()

  const produkState = useSelector((state) => state.produk)
  const dispatch = useDispatch()
  const meta = useSelector((state) => state.meta.produk)
  const BASE_URL = import.meta.env !== "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"
  const [canonical, setCanonical] = useState(`${BASE_URL}/produk/`)
  const [description, setDescription] = useState(meta["meta-description"])
  useEffect(() => {
    dispatch(fetchProduk())
    dispatch(fetchMetaProduk())
  }, [dispatch])

  useEffect(() => {
    // console.log(byKategori, kategori)
    if (byKategori && kategori) {
      setCanonical(`${BASE_URL}/produk/#/kategori/${kategori}`)
      setDescription(`${meta["meta-description"]} Kategori ${kategori}`)
    }
  }, [byKategori, kategori, setCanonical, setDescription])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>
      )}
      <ProdukMainContent
        byKategori={byKategori}
        produkData={produkState.data}
        loadingModel={loadingModel}
        reload={reload}
        model={model}
      />
    </>
  )
}

export default ProdukList
