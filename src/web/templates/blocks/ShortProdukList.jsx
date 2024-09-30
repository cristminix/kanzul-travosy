import MProdukRo from "@/global/git/orm/ro/models/MProdukRo"
import { useEffect, useState } from "react"
import { fixTags } from "@/global/fn/fixTags"
import { Clock as IconClock, User as IconUser } from "react-feather"
import { slugify } from "../../../global/fn/slugify"
import { getBlocksReadingTime } from "../../../global/fn/getBlocksReadingTime.js"
const mProdukRo = new MProdukRo()

const ShortProdukList = ({}) => {
  const [produkList, setProdukList] = useState([])
  const [loading, setLoading] = useState(true)
  const loadProdukList = async () => {
    setLoading(true)

    // const records = await fetchProdukList()
    // console.log(records)
    // setProdukList(records)
    await mProdukRo.initOrm()
    const list = await mProdukRo.getList(3, 1)
    for (const row of list.records) {
      row.readingTime = await mProdukRo.getReadingTime(row.id)
    }
    setProdukList(list.records)
    setLoading(false)
  }
  useEffect(() => {
    loadProdukList()
  }, [setProdukList, setLoading])

  const styles = {}
  const cls0 = "cls-0 container relative md:mt-24 mt-16"
  const cls1 = "cls-1 grid grid-cols-1 pb-6 text-center"
  const cls2 = "cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
  const cls3 = "cls-3 text-slate-400 max-w-xl mx-auto"
  const cls4 = "cls-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6"
  const cls5 = "cls-5 group relative overflow-hidden"
  const cls6 = "cls-6 relative overflow-hidden rounded-md shadow dark:shadow-gray-800"
  const cls7 = "cls-7 group-hover:scale-110 group-hover:rotate-3 duration-500"
  const cls8 = "cls-8 absolute top-0 start-0 p-4 opacity-0 group-hover:opacity-100 duration-500"
  const cls9 = "cls-9 bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5"
  const cls10 = "cls-10 mt-6"
  const cls11 = "cls-11 flex mb-4"
  const cls12 = "cls-12 flex items-center text-slate-400 text-sm"
  const cls13 = "cls-13 size-4 text-slate-900 dark:text-white me-1.5"
  const cls14 = "cls-14 text-slate-400 text-sm ms-3 twx-flex twx-items-center"
  const cls15 = "cls-15 text-slate-900 dark:text-white hover:text-red-500 dark:hover:text-red-500 font-medium"
  const cls16 = "cls-16 text-lg font-medium hover:text-red-500 duration-500 ease-in-out"
  const cls17 = "cls-17 text-slate-400 mt-2"
  const cls18 = "cls-18 mt-3"
  const cls19 = "cls-19 hover:text-red-500 inline-flex items-center"
  const cls20 = "cls-20 size-4 ms-1"
  const cls21 = "twx-w-[14.6px] twx-h-[14.6px] twx-inline"
  const skeleton = "twx-shadow twx-bg-slate-300 twx-opacity-80 twx-shadow twx-rounded-md"

  return (
    <>
      <div className={cls0}>
        <div className={cls1}>
          <h3 className={cls2}> Produk </h3>

          <p className={cls3}> Produk Santri Kanzululum. </p>
        </div>
        {/*<!--end grid-->*/}
        <div className={cls4}>
          {loading && (
            <>
              {[...Array(3)].fill(1).map((item, index) => {
                return (
                  <div className={`${cls5} twx-animate-pulse `}>
                    <div className={`${cls6} ${skeleton}`}>
                      <div className={`${cls7} twx-h-[200px] twx-w-full ${skeleton}`}></div>
                    </div>

                    <div className={cls10}>
                      <div className={`${cls11} twx-w-3/4 ${skeleton} twx-h-4`}></div>

                      <a className={`${cls16} ${skeleton} twx-h-2`}> </a>
                      <p className={`${cls17} ${skeleton} twx-h-2`}> </p>
                      <p className={`${cls17} ${skeleton} twx-h-2`}> </p>
                      <p className={`${cls17} ${skeleton} twx-h-2`}> </p>

                      <div className={`${cls18}  twx-w-1/2 ${skeleton} twx-h-6`}></div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
          {produkList.map((post, index) => {
            const slug = slugify(post.title)

            const postUrlCompiled = `/produk/lihat/${post.id}/${slug}`
            // const postUrl = post.compiledHash ? postUrlCompiled : `/produk/#/lihat/${post.id}/${slug}`
            const postUrl = `/produk/#/lihat/${post.id}/${slug}`
            return (
              <div className={cls5} key={index}>
                <div className={cls6}>
                  <img src={`/assets/images/produk/covers/${post.cover}`} alt={post.title} className={cls7} />
                  <div className={cls8}>
                    <span className={cls9}> {fixTags(post.tags)} </span>
                  </div>
                </div>

                <div className={cls10}>
                  <div className={cls11}>
                    <span className={cls12}>
                      <IconClock className={`${cls21} ${cls13} `} /> {`${post.readingTime ?? 0} min baca`}
                    </span>
                    <span className={cls14}>
                      <IconUser className={`${cls21} ${cls13} `} />
                      <a href={`/produk/#/kategori/${post.kategori}`} className={cls15}>
                        {post.kategori ? `${post.kategori}` : "Produk"}
                      </a>
                    </span>
                  </div>

                  <a href={postUrl} className={cls16}>
                    {post.title}
                  </a>
                  <p className={`${cls17} twx-line-clamp-3`}> {post.headline} </p>

                  <div className={cls18}>
                    <a href={postUrl} className={cls19}>
                      Selengkapnya
                      <i data-feather="chevron-right" className={cls20}></i>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/*<!--end grid-->*/}
      </div>
      {/*<!--end container-->*/}
    </>
  )
}

export default ShortProdukList
