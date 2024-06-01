import { LazyLoadImage } from "react-lazy-load-image-component"

const FullLembaga = ({ className, lembaga }) => {
  const cls0 = "cls-0 cls-1 container relative"
  const cls1 = "cls-1 cls-2 grid md:grid-cols-12 grid-cols-1 items-center gap-6 relative"
  const cls2 = "cls-2 cls-3 md:col-span-5"
  const cls3 = "cls-3 cls-4 relative"
  const cls4 = "cls-4 cls-5 mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[90%]"
  const cls13 = "cls-13 cls-14 md:col-span-7"
  const cls14 = "cls-14 cls-15 lg:ms-8"
  const cls15 = "cls-15 cls-16 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
  const cls16 = "cls-16 cls-17 text-slate-400 max-w-xl mb-6"
  const cls17 =
    "cls-17 cls-18 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
  const cls18 = "cls-18 cls-19 mdi mdi-chevron-right align-middle ms-0.5"
  const cls19 = "cls-19 cls-20 absolute bottom-0 start-1/3 -z-1"
  const cls20 = "cls-20 cls-21 lg:w-[600px] w-96"
  return (
    <>
      {lembaga.contents.map((item, index) => {
        const genap = (index + 1) % 2 === 0
        return (
          <div className={`${cls0} ${className}`}>
            <div className={cls1}>
            {genap?<>
                <div className={cls2}>
                <div className={cls3}>
                  <LazyLoadImage src={item.image} alt={item.title} className={cls4} />
                </div>
              </div>
              <div className={cls13}>
                <div className={cls14}>
                  {/*<h4 className="text-green-500 "></h4>*/}
                  <h3 className={`${cls15} font-3xl`}>
                    <span>{item.name}</span>
                  </h3>
                  <p className={cls16}>{item.description}</p>
                </div>
              </div>
              <div className={cls19}>
                <img src="/assets/images/map-plane-big.png" alt="" className={cls20} />
              </div>
            </>:<>
              
              <div className={cls13}>
                <div className={cls14}>
                  {/*<h4 className="text-green-500 "></h4>*/}
                  <h3 className={`${cls15} font-3xl`}>
                    <span>{item.name}</span>
                  </h3>
                  <p className={cls16}>{item.description}</p>
                </div>
              </div>
              <div className={cls2}>
                <div className={cls3}>
                  <LazyLoadImage src={item.image} alt={item.title} className={cls4} />
                </div>
              </div>
              <div className={cls19}>
                <img src="/assets/images/map-plane-big.png" alt="" className={cls20} />
              </div>
            </>}
              

            </div>
          </div>
        )
      })}
    </>
  )
}

export default FullLembaga