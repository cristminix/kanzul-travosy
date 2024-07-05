import { useEffect } from "react"
import { tns } from "tiny-slider"

const ShortLembaga = ({className, lembaga})=>{
    const styles = {  }
    const cls0 = "cls-0 container relative md:mt-24 mt-16"
		const cls1 = "cls-1 grid grid-cols-1 pb-6 text-center"
		const cls2 = "cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
		const cls3 = "cls-3 text-slate-400 max-w-xl mx-auto"
		const cls4 = "cls-4 grid grid-cols-1 mt-6"
		const cls5 = "cls-5 tiny-three-item"
		const cls6 = "cls-6 tiny-slide text-center"
		const cls7 = "cls-7"
		const cls8 = "cls-8 content relative rounded shadow dark:shadow-gray-700 m-2 p-6 bg-white dark:bg-slate-900 "
		const cls9 = "cls-9 mdi mdi-format-quote-open mdi-48px text-red-500"
		const cls10 = "cls-10 text-slate-400"
		const cls11 = "cls-11 list-none mb-0 text-amber-400 mt-3"
		const cls12 = "cls-12 inline"
		const cls13 = "cls-13 mdi mdi-star"
		const cls14 = "cls-14 text-center mt-5"
		const cls15 = "cls-15 size-48  dark:shadow-gray-700 mx-auto "
		const cls16 = "cls-16 mt-2 font-semibold"
		const cls17 = "cls-17 text-slate-400 text-sm"
    useEffect(()=>{
        if(document.getElementsByClassName('tiny-three-item').length > 0) {
            var slider = tns({
                container: '.tiny-three-item',
                controls: false,
                mouseDrag: true,
                loop: true,
                rewind: true,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 3000,
                navPosition: "bottom",
                speed: 400,
                gutter: 12,
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
            
            return ()=>{slider.destroy()}
        };
    },[lembaga.contents])
    return <>
      <div className={cls0}> 
                 <div className={cls1}> 
                     <h3 className={cls2}> Lembaga Pendidikan Agama Islam </h3> 

                     <p className={cls3}> Kami menyediakan beberapa lembaga pendidikan islam yang sesuai dengan kebutuhan Anda. </p> 
                 </div> {/*<!--end grid-->*/} 

                 <div className={cls4}> 
                     <div className={cls5}> 
                     {lembaga&&Array.isArray(lembaga.contents)&&lembaga.contents.map((item,index)=>{

                        return <div className={cls6} key={index}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                 <img src={item.image} alt={item.name} className={cls15}/> 
                                 <h4 className={cls16}>{item.name}</h4> 

                                 </div> 
                                
                                 <div className={cls14}> 
                                     {/* <span className={cls17}> Manager </span>  */}
                                 </div> 
                             </div> 
                         </div>
                     })}
                          

                         

                     </div> 
                 </div> {/*<!--end grid-->*/} 
             </div> {/*<!--end container-->*/}
    </>
 }   

 export default  ShortLembaga
    