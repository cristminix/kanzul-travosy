import Hero from "../blocks/Hero"
import fetchBerita from "@/global/api/berita/fetchBerita"

import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"
import BeritaList from "../blocks/BeritaList"
import BeritaPager from "../blocks/BeritaPager"

import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { getReadingTime } from "../../../global/fn/getReadingTime.js"

const BeritaMainContent = ({ beritaData, model, reload, loadingModel, byAuthor }) => {
  const { pageNumber, author } = useLoaderData()
  // console.log({byAuthor,author,pageNumber})

  // console.log({ beritaData })
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: "Home", path: "/" },
    { title: "Berita", path: "/berita" },
  ])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  // const [page,setPage] = useState(pageNumber||1)
  const [limit, setLimit] = useState(6)
  const [pager, setPager] = useState({
    page: 1,
    limit,
    totalPages: 0,
    totalRecords: 0,
  })

  const updateList = async (pageNumber) => {
    setLoading(true)
    const page = parseInt(pageNumber || 1)
    setList((oList) => [])

    let newList = null
    if (!byAuthor) {
      newList = await fetchBerita(page, limit)
    } else {
      newList = await fetchBerita(page, limit, author)

      setBreadcrumbs([
        { title: "Home", path: "/" },
        { title: "Berita", path: "/berita" },
        { title: `Oleh ${author}`, path: null },
      ])
    }
    if (!newList) {
      setLoading(false)
      return
    }
    // console.log(newList)
    for (const row of newList.berita) {
      row.readingTime = await  getReadingTime(row.content)
    }
    setList((oList) => ({
      records: newList.berita
    }))
    setPager((oPager) => ({
      ...oPager,
      limit,
      page,
      totalRecords: newList.pagination.total,
      totalPages: newList.pagination.totalPages,
    }))
    setLoading(false)
  }
  useEffect(() => {
    // console.log(model.ready,{pageNumber})

    // if (model && model.ready) 
      updateList(pageNumber)
  }, [setList, reload, setPager, pageNumber, setLoading, byAuthor, author])
  const routeName = byAuthor ? `penulis/${author}/page` : "page"
  return (
    <>
      <BannerCrumb banner={beritaData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">
        <div className="container twx-relative">
          <BeritaList list={list} loading={loading} />
          <BeritaPager pager={pager} loading={loading} routeName={routeName} />
          {/*<section className="relative md:py-24 py-16 overflow-hidden">
        <FullBerita className="mt-12" berita={beritaData} />
      </section>*/}
        </div>
      </section>
    </>
  )
}

export default BeritaMainContent
