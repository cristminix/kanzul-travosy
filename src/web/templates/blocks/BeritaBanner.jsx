import { useEffect, useState } from "react"

const BeritaBanner = ({ breadcrumbs, banner, berita }) => {
  const [bgStyle, setBgStyle] = useState({})
  useEffect(() => {
    // console.log(banner)
    if (banner.image) {
      setBgStyle((oStyle) => {
        return { backgroundImage: `url('${banner.image}')` }
      })
    }
  }, [banner, setBgStyle])
  const styles = {}
  const cls0 = "cls-0 relative table w-full items-center py-36  bg-top bg-no-repeat bg-cover"
  const cls1 = "cls-1 absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"
  const cls2 = "cls-2 container relative"
  const cls3 = "cls-3 grid grid-cols-1 pb-8 text-center mt-10"
  const cls4 = "cls-4 text-4xl leading-normal tracking-wider font-semibold text-white"
  const cls5 = "cls-5 list-none mt-6"
  const cls6 = "cls-6 inline-block text-white/50 mx-5"
  const cls7 = "cls-7 text-white block"
  const cls8 = "cls-8 block"
  const cls9 = "cls-9 absolute text-center z-10 bottom-5 start-0 end-0 mx-3"
  const cls10 = "cls-10 tracking-[0.5px] mb-0 inline-block"
  const cls11 =
    "cls-11 inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"
  const cls12 = "cls-12 inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"
  const cls13 = "cls-13 mdi mdi-chevron-right"
  const cls14 = "cls-14 inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
  const breadcrumbLength = breadcrumbs.length - 1
  if (!berita) return null
  return (
    <>
      {/*<!-- Start Hero -->*/}
      <section className={cls0} style={bgStyle}>
        <div className={cls1}> </div>
        <div className={cls2}>
          <div className={cls3}>
            <h1 className={cls4}> {banner.title} </h1>

            <ul className={cls5}>
              <li className={cls6}>
                {" "}
                <span className={cls7}> Penulis : </span> <span className={cls8}> {berita.author} </span>{" "}
              </li>
              <li className={cls6}>
                {" "}
                <span className={cls7}> Tanggal : </span> <span className={cls8}> {berita.tanggal} </span>{" "}
              </li>
              <li className={cls6}>
                {" "}
                <span className={cls7}> Waktu : </span> <span className={cls8}> {berita.readingTime} Menit Baca </span>{" "}
              </li>
            </ul>
          </div>{" "}
          {/*<!--end grid-->*/}
        </div>{" "}
        {/*<!--end container-->*/}
        <div className={cls9}>
          <ul className={cls10}>
            {breadcrumbs.map((item, index) => {
              const props = index === breadcrumbLength ? { "aria-current": "page" } : {}
              return (
                <>
                  <li {...props} className={index === breadcrumbLength ? cls14 : cls11} key={index}>
                    {index < breadcrumbLength ? <a href={item.path}> {item.title} </a> : item.title}
                  </li>
                  {index < breadcrumbLength ? (
                    <li className={cls12}>
                      {" "}
                      <i className={cls13}> </i>{" "}
                    </li>
                  ) : null}
                </>
              )
            })}
          </ul>
        </div>
      </section>{" "}
      {/*<!--end section-->*/}
    </>
  )
}

export default BeritaBanner
