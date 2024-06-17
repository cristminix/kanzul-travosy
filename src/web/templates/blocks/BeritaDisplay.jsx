import BlockData from "@/global/components/BlockData"
import { useEffect, useState } from "react"
import {User as IconUser} from "react-feather"
const cls0 = "cls-0 container"
const cls1 = "cls-1 grid md:grid-cols-12 grid-cols-1 gap-6"
const cls2 = "cls-2 lg:col-span-8 md:col-span-6"
const cls3 = "cls-3 relative overflow-hidden rounded-md shadow dark:shadow-gray-800"
const cls4 = "cls-4 p-6"
const cls5 = "cls-5 text-slate-400"
const cls6 = "cls-6 text-slate-400 italic border-x-4 border-red-500 rounded-ss-xl rounded-ee-xl mt-3 p-3"
const cls7 = "cls-7 text-slate-400 mt-3"
const cls8 = "cls-8 p-6 rounded-md shadow dark:shadow-gray-800 mt-8"
const cls9 = "cls-9 text-lg font-semibold"
const cls10 = "cls-10 mt-8"
const cls11 = "cls-11 grid lg:grid-cols-12 lg:gap-6"
const cls12 = "cls-12 lg:col-span-6 mb-5"
const cls13 = "cls-13 text-left"
const cls14 = "cls-14 font-semibold"
const cls15 =
  "cls-15 mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
const cls16 = "cls-16 grid grid-cols-1"
const cls17 = "cls-17 mb-5"
const cls18 =
  "cls-18 mt-3 w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 h-28"
const cls19 =
  "cls-19 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
const cls20 = "cls-20 lg:col-span-4 md:col-span-6"
const cls21 = "cls-21 sticky top-20"
const cls22 =
  "cls-22 text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center"
const cls23 = "cls-23 text-center mt-8"
const cls24 = "cls-24 h-20 w-20 mx-auto rounded-full shadow mb-4"
const cls25 = "cls-25 text-lg font-medium hover:text-red-500 transition-all duration-500 ease-in-out h5"
const cls26 =
  "cls-26 text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8"
const cls27 = "cls-27 list-none text-center mt-8 space-x-0.5"
const cls28 = "cls-28 inline"
const cls29 =
  "cls-29 size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-red-500 hover:text-white hover:bg-red-500"
const cls30 = "cls-30 size-4"
const Comments = ({}) => {
  return (
    <div className={`${cls8} hidden`}>
      <h5 className={cls9}> Tinggalkan Komentar: </h5>

      <form className={cls10}>
        <div className={cls11}>
          <div className={cls12}>
            <div className={cls13}>
              <label htmlFor="name" className={cls14}>
                Nama:
              </label>
              <input name="name" id="name" type="text" placeholder="Name :" className={cls15} />
            </div>
          </div>

          <div className={cls12}>
            <div className={cls13}>
              <label htmlFor="email" className={cls14}>
                Email:
              </label>
              <input name="email" id="email" type="email" placeholder="Email :" className={cls15} />
            </div>
          </div>
        </div>

        <div className={cls16}>
          <div className={cls17}>
            <div className={cls13}>
              <label htmlFor="comments" className={cls14}>
                Komentar:
              </label>
              <textarea name="comments" id="comments" placeholder="Message :" className={cls18} />
            </div>
          </div>
        </div>
        <button type="submit" id="submit" name="send" className={cls19}>
          Kirim
        </button>
      </form>
    </div>
  )
}
const AuthorDetail = ({berita})=>{
    return <div className={cls21}>
                  <h5 className={cls22}> Penulis </h5>
                  <div className={cls23}>
                    <IconUser className={cls24} />

                    <a href="" className={cls25}>
                      
                      {berita.author}
                    </a>
                    {/*<p className={cls5}> Content Writer </p>*/}
                  </div>
                  {/*   
                             <h5 className={cls26}> Social sites </h5> 
                             <ul className={cls27}> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="facebook" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="instagram" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="twitter" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="linkedin" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="github" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="youtube" className={cls30}> </i> </a> </li> 
                                 <li className={cls28}> <a href="" className={cls29}> <i data-feather="gitlab" className={cls30}> </i> </a> </li> 
                             </ul>  
                            */}
                </div>
}
const BeritaDisplay = ({ berita, loading }) => {
  const [blocks, setBlocks] = useState([])
  useEffect(() => {
    if (berita) {
      const { content } = berita
      let newBlocks = []
      try{
        newBlocks = JSON.parse(content)
        setBlocks(newBlocks)
      }catch(e){}
      // console.log(content)
    }
  }, [berita, setBlocks])
  const styles = {}

  return (
    <>
      <div className={cls0}>
        <div className={cls1}>
          {loading ? (
            <>Loading</>
          ) : (berita&&
            <>
              <div className={cls2}>
                <div className={cls3}>
                  <img className="twx-w-full" src={`/assets/images/berita/covers/${berita.cover}`} alt={berita.title} />

                  <div className={cls4}>
                    <BlockData data={blocks}/>
                  </div>
                </div>

                <Comments />
              </div>
              <div className={cls20}>
                <AuthorDetail berita={berita}/>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BeritaDisplay