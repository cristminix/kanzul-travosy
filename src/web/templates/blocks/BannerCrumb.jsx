import { useEffect, useState } from "react"
const BannerCrumb = ({ breadcrumbs, banner }) => {
  const [bgStyle, setBgStyle] = useState({})
  useEffect(() => {
    // console.log({ banner })
    if (!banner) return
    if (banner.image) {
      setBgStyle((oStyle) => {
        return { backgroundImage: `url('${banner.image}')` }
      })
    }
  }, [banner, setBgStyle])
  const styles = {}
  const cls0 = `cls-0 relative table w-full items-center py-36  bg-top bg-no-repeat bg-cover`
  const cls1 = "cls-1 absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"
  const cls2 = "cls-2 container relative"
  const cls3 = "cls-3 grid grid-cols-1 pb-8 text-center mt-10"
  const cls4 = "cls-4 text-4xl leading-normal tracking-wider font-semibold text-white"
  const cls5 = "cls-5 absolute text-center z-10 bottom-5 start-0 end-0 mx-3"
  const cls6 = "cls-6 tracking-[0.5px] mb-0 inline-block"
  const cls7 =
    "cls-7 inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"
  const cls8 = "cls-8 inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"
  const cls9 = "cls-9 mdi mdi-chevron-right"
  const cls10 = "cls-10 inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"

  const breadcrumbLength = breadcrumbs.length - 1
  if (!banner) return null
  return (
    <section className={cls0} style={bgStyle}>
      <div className={cls1}> </div>
      <div className={cls2}>
        <div className={cls3}>
          <h1 className={cls4}> {banner.title} </h1>
        </div>{" "}
        {/*<!--end grid-->*/}
      </div>{" "}
      {/*<!--end container-->*/}
      <div className={cls5}>
        <ul className={cls6}>
          {breadcrumbs.map((item, index) => {
            const props = index === breadcrumbLength ? { "aria-current": "page" } : {}
            return (
              <>
                <li {...props} className={index === 0 ? cls7 : cls10} key={index}>
                  {index < breadcrumbLength ? <a href={item.path}> {item.title} </a> : item.title}
                </li>
                {index < breadcrumbLength ? (
                  <li className={cls8}>
                    {" "}
                    <i className={cls9}> </i>{" "}
                  </li>
                ) : null}
              </>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default BannerCrumb
