import { LazyLoadImage } from "react-lazy-load-image-component"

const Fullkegiatan = ({ className, kegiatan }) => {
  console.log(kegiatan)
  const cls0 = "cls-0 cls-1 container relative twx-mb-8"
  const cls1 = "cls-1 cls-2 grid grid-cols-1 items-center relative"
  const cls2 = "cls-2 cls-3 md:col-span-5"
  const cls3 = "cls-3 cls-4 relative "
  const cls4 = "cls-4 cls-5 mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[85%]"
  const cls13 = "cls-13 cls-14 md:col-span-7"
  const cls14 = "cls-14 cls-15 lg:ms-8"
  const cls15 = "cls-15 cls-16 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
  const cls16 = "cls-16 cls-17 text-slate-400 max-w-xl mb-6"
  const cls17 =
    "cls-17 cls-18 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
  const cls18 = "cls-18 cls-19 mdi mdi-chevron-right align-middle ms-0.5"
  const cls19 = "cls-19 cls-20 absolute bottom-0 start-1/3 -z-1"
  const cls20 = "cls-20 cls-21 lg:w-[600px] w-96"
  const clsBordered = "twx-py-2 twx-px-4 twx-border twx-border-zinc-150 twx-text-slate-400"

  return (
    <>
      <div className={cls0}>
        <div className={cls1}>
          <table className="twx-mx-auto  twx-border twx-border-slate-300 twx-border-collapse">
            <tbody>
              <tr className="twx-bg-slate-50 ">
                <th className={`twx-text-center ${clsBordered}`}>NO.</th>
                <th className={`twx-text-center ${clsBordered} twx-w-[200px]`}>WAKTU</th>
                <th className={clsBordered} width="962">KEGIATAN</th>
              </tr>
              {kegiatan.contents.map((item,index)=>{
                return <tr key={index}>
                  <td className={`twx-text-center ${clsBordered}`}>{index+1}.</td>
                  <td className={`twx-text-center ${clsBordered}`}>{item.waktu}</td>
                  <td className={clsBordered}>{item.kegiatan}</td>
                </tr>  
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Fullkegiatan