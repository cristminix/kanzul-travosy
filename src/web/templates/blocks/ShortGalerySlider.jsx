
import {tns} from "tiny-slider"
 import {useEffect} from "react"
 const ShortGalerySlider = ({galeryList})=>{
    const cls0 = "cls-0 container relative"
		const cls1 = "cls-1 grid grid-cols-1 relative"
		const cls2 = "cls-2 tiny-twelve-item"
		const cls3 = "cls-3 tiny-slide"
		const cls4 = "cls-4 lightbox d-inline-block"
		const cls5 = "cls-5 max-w[250px] object-cover"
		const cls6 = "cls-6 absolute top-2/4 -translate-y-2/4 start-2/4 ltr:-translate-x-2/4 rtl:translate-x-2/4 text-center"
		const cls7 = "cls-7 size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border border-red-500 bg-red-500 text-white"
		const cls8 = "cls-8 size-4"

    useEffect(()=>{
        if(document.getElementsByClassName('tiny-twelve-item').length > 0) {
            var slider = tns({
                container: '.tiny-twelve-item',
                controls: true,
                mouseDrag: true,
                loop: true,
                // rewind: true,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 3000,
                navPosition: "bottom",
                controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
                nav: false,
                speed: 1000,
                gutter: 0,
                lazyload:true,
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
                    // 1025: {
                    //     items: 8
                    // },

                    // 992: {
                    //     items: 4
                    // },

                    // 767: {
                    //     items: 4
                    // },

                    // 575: {
                    //     items: 3
                    // },

                    // 420: {
                    //     items: 3
                    // },

                    // 320: {
                    //     items: 2
                    // },
                },
            });
        };

        try {
            const tobii = new Tobii()
        } catch (err) {

        }
        ()=>{
            tobii.destroy()
            slider.destroy()
        }
    },[])    
    return <>
       {/*<!-- Insta Post Start -->*/} 
         <div className={cls0}> 
            <div className="cls-1 grid grid-cols-1 pb-6 text-center"> 
             <h3 className="cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"> Galeri Kami </h3> 

             <p className="cls-3 text-slate-400 max-w-xl mx-auto"> Foto kegiatan Pondok Pesantren Kanzululum. </p> 
         </div> {/*<!--end grid-->*/} 
             <div className={cls1}> 
                 <div className={cls2}> 
                {galeryList.map((item,index)=>(
                     <div className={cls3} key={index}> 
                         <a href={item.image} title={item.title} className={cls4}> 
                             <img src="data:image/gif;base64,R0lGODlhAQABAPAAAMzMzAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" data-src={item.image} alt={item.title} className={`tns-lazy-img ${cls5}`}/> 
                         </a> 
                     </div> 
                        ))}
                 </div> 

                {/* <div className={cls6}> 
                     <a href="https://www.instagram.com/pp_kanzululum/" target="_blank" className={cls7}> <i data-feather="instagram" className={cls8}> </i> </a> 
                 </div> */}
             </div> {/*<!--end grid-->*/} 
         </div> {/*<!--end container-->*/} 
         {/*<!-- Insta Post End -->*/}
    </>
 }   

 export default  ShortGalerySlider
    