import BlockData from "@/global/components/BlockData"
import { useEffect, useState } from "react"
import {
    User as IconUser,Share2 as IconShare,
    Facebook as IconFacebook,
    Twitter as IconTwitter,
    Instagram as IconInstagram,
    Mail as IconEmail
} from "react-feather"
import{    
    Whatsapp as IconWhatsapp
} from "react-bootstrap-icons"
import {Link} from "react-router-dom"
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
const cls28_ = "cls-28 inline"
const cls28 =
  "cls-29 size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-red-500 hover:text-white hover:bg-red-500"
const cls30 = "cls-30 size-4"
const skeleton = "twx-shadow twx-bg-slate-300 twx-opacity-80 twx-shadow twx-rounded-md"
const cls29=cls28
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
const KategoriDetail = ({produk,loading})=>{
    return <div className={`${cls21} `}>
    {loading?<div className=" twx-animate-pulse ">
         <h5 className={`${''} ${skeleton} twx-h-6`}>  </h5>
                  <div className={cls23}>
                    <div className={`${cls24} ${skeleton} !twx-mb-8`} ></div>
                    <div className={`${cls25} ${skeleton} twx-h-6`}>
                    
                    </div>
                    {/*<p className={cls5}> Content Writer </p>*/}
                  </div>
                   
                     <h5 className={`${cls26} ${skeleton} twx-h-8`}>  </h5> 
                     <ul className={cls27}> 
                         <li className={`${cls28} ${skeleton}`}> </li> 
                         <li className={`${cls28} ${skeleton}`}></li> 
                         <li className={`${cls28} ${skeleton}`}> </li> 
                         <li className={`${cls28} ${skeleton}`}> </li> 
                         <li className={`${cls28} ${skeleton}`}> </li> 
                         <li className={`${cls28} ${skeleton}`}> </li> 
                         <li className={`${cls28} ${skeleton}`}></li> 
                     </ul>  
                
        </div>:<>
         <h5 className={cls22}> Kategori </h5>
                  <div className={cls23}>
                    <IconUser className={cls24} />

                    <Link to={`/kategori/${produk.author}`} className={cls25}>
                      
                      {produk.author}
                    </Link>
                    {/*<p className={cls5}> Content Writer </p>*/}
                  </div>
                 <h5 className={`${cls26} twx-flex twx-items-center twx-justify-center`}> <IconShare className={`${cls30} twx-mr-2`}/> Bagikan </h5> 
                 <ul className={cls27}> 
                     <li className={cls28}> <a target="_blank" href={`https://www.facebook.com/sharer.php?u=${produk.shareLink}`} className={cls29}> <IconFacebook className={cls30}/> </a> </li> 
                     <li className={cls28}> <a target="_blank" href={`mailto://?subject=${encodeURIComponent(produk.title)}&amp;body=${encodeURIComponent(produk.title)}%20${produk.shareLink}`} className={cls29}> <IconEmail className={cls30}/> </a> </li> 
                     <li className={cls28}> <a target="_blank"  href={`http://www.twitter.com/share?url=${produk.shareLink}`} className={cls29}> <IconTwitter className={cls30}/> </a> </li> 
                     <li className={cls28}> <a target="_blank" href={`https://wa.me/?text=${produk.shareLink}`} className={cls29}> <IconWhatsapp className={cls30}/> </a> </li> 
                 </ul>  
    </>}
    </div>

                 
}
const ProdukDisplay = ({ produk, loading }) => {
  // const [blocks, setBlocks] = useState([])
  // useEffect(() => {
  //   if (produk) {
  //     const { content } = produk
  //     let newBlocks = []
  //     try{
  //       newBlocks = JSON.parse(content)
  //       setBlocks(newBlocks)
  //     }catch(e){}
  //     // console.log(content)
  //   }
  // }, [produk, setBlocks])
  const styles = {}

  return (
    <>
      <div className={cls0}>
        <div className={cls1}>
          {loading ? (
           <>
               <div className={`${cls2}  twx-animate-pulse`}>
                <div className={cls3}>
                  <div className={`twx-w-full twx-h-[300px] ${skeleton}`}></div>

                  <div className={cls4}>
                  {[...Array(10)].fill(1).map((item,index)=>{
                    return <p key={index} className={`twx-p-2 twx-my-2 ${skeleton} twx-h-2`}> </p> 

                  })}
                  </div>
                </div>

                <Comments />
              </div>
              <div className={cls20}>
                <KategoriDetail produk={produk} loading={loading}/>
              </div>
           </>

          ) : (produk&&
            <>
              <div className={cls2}>
                <div className={cls3}>
                  <img className="twx-w-full" src={`/assets/images/produk/covers/${produk.cover}`} alt={produk.title} />

                  <div className={cls4}>
                    <BlockData data={produk.content}/>
                  </div>
                </div>

                <Comments />
              </div>
              <div className={cls20}>
                <KategoriDetail produk={produk}/>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProdukDisplay