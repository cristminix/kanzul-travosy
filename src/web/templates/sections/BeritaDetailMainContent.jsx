import Hero from "../blocks/Hero"

import FullBeritaDetail from "../blocks/FullBeritaDetail"
import BeritaBanner from "../blocks/BeritaBanner"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getBlocksReadingTime } from "@/global/fn/getBlocksReadingTime"
import moment from "moment"
import { createDateFromSqlDateTime } from "@/global/fn/createDateFromSqlDateTime"
import { fetchMetaBerita } from "@/global/store/features/metaSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { slugify } from "../../../global/fn/slugify"
import { Helmet } from "react-helmet-async"

const BeritaDetailMainContent = ({ model, loadingModel, reload, metaMode }) => {
  const { id } = useLoaderData()
  const [pk, setPk] = useState(id)

  const [banner, setBanner] = useState({ title: "", image: null })
  const [berita, setBerita] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(loadingModel)
  const dispatch = useDispatch()

  const meta = useSelector((state) => state.meta.berita)
  const BASE_URL = import.meta.env !== "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState(meta.title)
  const [canonical, setCanonical] = useState(`${BASE_URL}/baca/${id}/${slug}`)
  const [description, setDescription] = useState(meta["meta-description"])
  const loadBeritaDetail = async () => {
    if (!pk) {
      return
    }
    setLoading(true)
    const detail = await model.get(pk)
    const slug_ = slugify(detail.title)
    setSlug(slug_)
    setTitle(detail.title)
    setCanonical(`${BASE_URL}/baca/${id}/${slug_}`)
    setDescription(detail.headline.substr(0, 170))
    try {
      detail.content = JSON.parse(detail.content)
    } catch (e) {
      detail.content = []
    }
    detail.readingTime = getBlocksReadingTime(detail.content)
    detail.tanggal = moment(createDateFromSqlDateTime(detail.dateCreated)).format("DD/MM/YYYY")
    const link = `${document.location.href}`
    detail.shareLink = encodeURIComponent(link)
    setBerita((oData) => ({ ...oData, ...detail }))
    const breadcrumbs = [
      { title: "Home", path: "/" },
      { title: "Berita", path: "/berita" },
      { title: detail.title, path: `#/baca/${id}/${slug}` },
    ]
    setBreadcrumbs((oData) => [...breadcrumbs])
    setBanner((oData) => ({ ...oData, title: detail.title, image: `/assets/images/berita/covers/${detail.cover}` }))
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
    if (model.ready) loadBeritaDetail()
  }, [pk, setBerita, reload, setLoading, setCanonical, setDescription])
  useEffect(() => {
    if (metaMode) {
      getPkByMeta()
    }
  }, [metaMode, setPk])

  useEffect(() => {
    // dispatch(fetchMetaBerita())
  }, [])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>
      )}
      <BeritaBanner banner={banner} breadcrumbs={breadcrumbs} berita={berita} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullBeritaDetail metaMode={metaMode} className="mt-12" berita={berita} loading={loading} />
      </section>
    </>
  )
}

export default BeritaDetailMainContent
