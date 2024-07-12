// import Hero from "../blocks/Hero"

import FullProdukDetail from "../blocks/FullProdukDetail"
import ProdukBanner from "../blocks/ProdukBanner"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getBlocksReadingTime } from "@/global/fn/getBlocksReadingTime"
import moment from "moment"
import { createDateFromSqlDateTime } from "@/global/fn/createDateFromSqlDateTime"
import { fetchMetaProduk } from "@/global/store/features/metaSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { slugify } from "@/global/fn/slugify"
// import { blockDataToText } from "@/global/fn/blockDataToText"
import { Helmet } from "react-helmet-async"

const ProdukDetailMainContent = ({ model, loadingModel, reload, metaMode }) => {
  const { id } = useLoaderData()
  const [pk, setPk] = useState(id)
  const [banner, setBanner] = useState({ title: "", image: null })
  const [produk, setProduk] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(loadingModel)
  const dispatch = useDispatch()
  const meta = useSelector((state) => state.meta.produk)
  const BASE_URL = "https://www.ponpeskanzululumcirebon.com"
  const [slug, setSlug] = useState("")
  const [canonical, setCanonical] = useState(`${BASE_URL}/lihat/${id}/${slug}`)
  const [description, setDescription] = useState(meta["meta-description"])
  const loadProdukDetail = async () => {
    if (!pk) {
      return
    }
    setLoading(true)
    const detail = await model.get(pk)
    const slug_ = slugify(detail.title)
    setSlug(slug_)
    setCanonical(`${BASE_URL}/lihat/${id}/${slug_}`)
    try {
      detail.content = JSON.parse(detail.content)
      setDescription(detail.headline.substr(0, 170))
    } catch (e) {
      detail.content = []
    }
    detail.readingTime = getBlocksReadingTime(detail.content)
    detail.tanggal = moment(createDateFromSqlDateTime(detail.dateCreated)).format("DD/MM/YYYY")
    const link = `${document.location.href}`
    detail.shareLink = encodeURIComponent(link)
    setProduk((oData) => ({ ...oData, ...detail }))
    const breadcrumbs = [
      { title: "Home", path: "/" },
      { title: "Produk", path: "/produk" },
      { title: detail.title, path: `#/baca/${id}/${slug}` },
    ]
    setBreadcrumbs((oData) => [...breadcrumbs])
    setBanner((oData) => ({ ...oData, title: detail.title, image: `/assets/images/produk/covers/${detail.cover}` }))
    setLoading(false)
  }

  const getPkByMeta = () => {
    const meta = document.querySelector("meta[name=id]")
    const id = meta.getAttribute("content")
    if (id) {
      setPk(id)
    }
    // console.log(meta.getAttribute("content"))
  }
  useEffect(() => {
    dispatch(fetchMetaProduk())
  }, [])
  useEffect(() => {
    if (model.ready) loadProdukDetail()
  }, [pk, setProduk, reload, setLoading, setCanonical, setDescription])

  useEffect(() => {
    if (metaMode) {
      getPkByMeta()
    }
  }, [metaMode, setPk])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>
      )}
      <ProdukBanner banner={banner} breadcrumbs={breadcrumbs} produk={produk} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullProdukDetail metaMode={metaMode} className="mt-12" produk={produk} loading={loading} />
      </section>
    </>
  )
}

export default ProdukDetailMainContent
