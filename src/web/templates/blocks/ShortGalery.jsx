import { useEffect,useState } from "react"
import {tns} from "tiny-slider"
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ShortGalery = ({galeryList})=>{
    const styles = {  }
    const cls0 = "cls-0 container relative md:mt-24 mt-16"
		const cls1 = "cls-1 grid grid-cols-1 pb-6 text-center"
		const cls2 = "cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
		const cls3 = "cls-3 text-slate-400 max-w-xl mx-auto"
		const cls4 = "cls-4 grid grid-cols-1 mt-6"
		const cls5 = "cls-5 tiny-three-short-galery"
		const cls6 = "cls-6 tiny-slide text-center"
		const cls7 = "cls-7 cursor-e-resize"
		const cls8 = "cls-8 content relative rounded shadow dark:shadow-gray-700 m-2 p-6 bg-white dark:bg-slate-900 before:content-[''] before:absolute before:start-1/2 before:-bottom-[4px] before:box-border before:border-8 before:rotate-[45deg] before:border-t-transparent before:border-e-white dark:before:border-e-slate-900 before:border-b-white dark:before:border-b-slate-900 before:border-s-transparent before:shadow-testi dark:before:shadow-gray-700 before:origin-top-left"
		const cls9 = "cls-9 mdi mdi-format-quote-open mdi-48px text-red-500"
		const cls10 = "cls-10 text-slate-400"
		const cls11 = "cls-11 list-none mb-0 text-amber-400 mt-3"
		const cls12 = "cls-12 inline"
		const cls13 = "cls-13 mdi mdi-star"
		const cls14 = "cls-14 text-center mt-5"
		const cls15 = "cls-15 size-48  dark:shadow-gray-700 mx-auto "
		const cls16 = "cls-16 mt-2 font-semibold"
		const cls17 = "cls-17 text-slate-400 text-sm"
        const lightboxCls = "fixed inset-0 p-4 bg-black/75 overflow-auto z-1000"
        const lightboxClsHidden = `hidden ${lightboxCls}`
        const [lightboxShown,showLightbox] = useState(false)
        const [lightboxImg,setLightboxImg] = useState(false)
        const setActiveImage=(e)=>{
            const el = e.target
            setLightboxImg(el.src)
            showLightbox(true)
            // console.log(el)
        }
        const onTnsTransitionEnd = function (info, eventName) {
          // console.log(info.event.type, info.container.id);
          if(info.event.type === "transitionend"){
            info.container.querySelectorAll('img').forEach(item=>{
                if(!item.parentNode.onclick)item.parentNode.onclick = setActiveImage
            })
          }
        }
    useEffect(()=>{
        document.body.style.overflow = lightboxShown?'hidden':'auto'
        if(lightboxShown){
            const imgContainer = document.querySelector('.lightbox-img-container')
            const img = imgContainer.querySelector('img')
            imgContainer.style.width=`${img.width}px`
            console.log(img.width)
        }
    },[lightboxShown])
    useEffect(()=>{
        if(document.getElementsByClassName('tiny-three-short-galery').length > 0) {
            var slider = tns({
                container: '.tiny-three-short-galery',
                controls: false,
                mouseDrag: true,
                loop: true,
                autoWidth:true,
                // rewind: true,
                autoplay: true,
                lazyload: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 3000,
                navPosition: "bottom",
                speed: 1000,
                gutter: 4,
                items:3,
                responsive: {
                    992: {
                        items: 3
                    },
        
                    767: {
                        items: 2
                    },
        
                    320: {
                        items: 1
                    },
                },
            });
            // bind function to event
            slider.events.on('transitionEnd', onTnsTransitionEnd);
            feather.replace();

            return ()=>{slider.destroy()}
        };
    },[])
    return <>
    
    <div id={`lightbox-short-galery`} className={`${lightboxShown?lightboxCls:lightboxClsHidden}`}>
      
     <div className="relative lightbox-img-container mx-auto">
      <a href="#" className="hover:opacity-[0.8] opacity-[0.5] m-1 py-2 px-2  bg-black rounded-full text-white absolute right-0 top-0" onClick={e=>{
        setLightboxImg(null)
        showLightbox(false)

        e.preventDefault()
      }}><i data-feather="x" className="size-4"></i></a>
            {lightboxImg?
          <img className="shadow-lg mx-auto h-full" src={lightboxImg}/>
            :null}
      </div>
    </div>
      <div className={cls0}> 
         <div className={cls1}> 
             <h3 className={cls2}> Galeri Kami </h3> 

             <p className={cls3}> Foto kegiatan Pondok Pesantren Kanzululum. </p> 
         </div> {/*<!--end grid-->*/} 

         <div className={cls4}> 
             <div className={cls5}> 
                {galeryList.map((item,index)=>(
                    <div className="item" key={index}> 
                         <a href={`#lightbox${index}`}><img  className={`tns-lazy-img max-h-[250px] shadow-md`} src="data:image/gif;base64,R0lGODlhAQABAPAAAMzMzAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" data-src={item.image} alt={item.title} width="375.234" height="249.984"/> </a>
                 </div> 
                ))}
                 
             </div> 
         </div> {/*<!--end grid-->*/} 
     </div> {/*<!--end container-->*/}
                
    </>
 }   

 export default  ShortGalery
    