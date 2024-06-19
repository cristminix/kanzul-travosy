
import Hero from "../blocks/Hero"

import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"
import ProdukList from "../blocks/ProdukList"
import ProdukPager from "../blocks/ProdukPager"
const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Produk", path: "/produk" },
  ]
import {useState,useEffect} from "react"
import {useLoaderData} from "react-router-dom"

const ProdukMainContent = ({ produkData , model,reload,loadingModel,byAuthor}) => {
  const {pageNumber,author} = useLoaderData()
  console.log({byAuthor,author,pageNumber})

  // console.log(produkData)
  const [list,setList] = useState([])
  const [loading,setLoading] = useState(loadingModel)
  // const [page,setPage] = useState(pageNumber||1)
  const [limit,setLimit] = useState(6)
  const [pager,setPager] = useState({
    page:1,limit,totalPages:0,totalRecords:0
  })

  const updateList=async(pageNumber)=>{
    setLoading(true)
    const page = parseInt(pageNumber||1)
    let newList = null 
    if(!byAuthor){
      newList = await model.getList(limit,page)
    }else{
        newList = await model.getList({limit,page,search:{
          type:'single',
          field:'author',
          query:author
        }})
    }
    if(!newList) {
      setLoading(false)
      return
    }
    // console.log(newList)
    for(const row of newList.records){
        row.readingTime = await model.getReadingTime(row.id)
    }
    setList(oList=>newList)
    setPager(oPager=>({
      ...oPager,limit,page,
      totalRecords:newList.totalRecords,
      totalPages:newList.totalPages
    }))
    setLoading(false)
  }
  useEffect(()=>{
    // console.log(model.ready,{pageNumber})

    if(model && model.ready)
      updateList(pageNumber)
  },[setList,reload,setPager,pageNumber,setLoading,byAuthor,author])
  const routeName=byAuthor?`penulis/${author}/page`:'page'
  return (
    <>
      <BannerCrumb banner={produkData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">      
        <div className="container twx-relative">
          <ProdukList list={list} loading={loading}/>
          <ProdukPager pager={pager} loading={loading} routeName={routeName}/>
          {/*<section className="relative md:py-24 py-16 overflow-hidden">
        <FullProduk className="mt-12" produk={produkData} />
      </section>*/}
        </div>
      </section>
    </>
  )
}

export default ProdukMainContent