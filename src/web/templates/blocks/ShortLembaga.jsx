import { useEffect } from "react"
import { tns } from "tiny-slider"

const ShortLembaga = ({})=>{
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
    },[])
    return <>
      <div className={cls0}> 
                 <div className={cls1}> 
                     <h3 className={cls2}> Lembaga Pendidikan Agama Islam </h3> 

                     <p className={cls3}> Kami menyediakan beberapa lembaga pendidikan islam yang sesuai dengan kebutuhan Anda. </p> 
                 </div> {/*<!--end grid-->*/} 

                 <div className={cls4}> 
                     <div className={cls5}> 
                         <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                 <img src="/assets/images/lembaga/lb-tpq.png" alt="Icon TPQ" className={cls15}/> 
                                 <h6 className={cls16}> Taman Pendidikan Qur’an Kanzul Ulum  </h6> 


                                     {/* <i className={cls9}> </i>  */}
                                     {/* <p className={cls10}> &quot; It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. &quot; </p>  */}
                                     {/* <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul>  */}
                                 </div> 
                                
                                 <div className={cls14}> 
                                     {/* <span className={cls17}> Manager </span>  */}
                                 </div> 
                             </div> 
                         </div> 

                         <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                 <img src="/assets/images/lembaga/lb-dta.png" alt="Icon DTA" className={cls15}/> 
                                     <h6 className={cls16}> Madrasah Diniyah Ta’miliyah Awaliyah Kanzul Ulum </h6> 
                                     
                                     {/* <i className={cls9}> </i>  */}
                                     {/* <p className={cls10}> &quot; The most well-known dummy text is the &apos;Lorem Ipsum&apos;, which is said to have originated in the 16th century. &quot; </p>  */}
                                     {/* <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul>  */}
                                 </div> 
                                
                                 <div className={cls14}> 
                                     {/* <span className={cls17}> Manager </span>  */}
                                 </div> 
                             </div> 
                         </div> 

                         <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                 <img src="/assets/images/lembaga/lb-mta.png" alt="Icon MTA" className={cls15}/> 
                                     <h6 className={cls16}> Majllis Ta’lim Kanzul Ulum </h6> 
                                     
                                     {/* <i className={cls9}> </i>  */}
                                     {/* <p className={cls10}> &quot; One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others. &quot; </p>  */}
                                     {/* <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul>  */}
                                 </div> 
                                
                                 <div className={cls14}> 
                                     {/* <span className={cls17}> Manager </span>  */}
                                 </div> 
                             </div> 
                         </div> 

                         {/* <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                     <i className={cls9}> </i> 
                                     <p className={cls10}> &quot; Thus, Lorem Ipsum has only limited suitability as a visual filler for German texts. &quot; </p> 
                                     <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul> 
                                 </div> 
                                
                                 <div className={cls14}> 
                                     <img src="assets/images/client/04.jpg" alt="" className={cls15}/> 
                                     <h6 className={cls16}> Smith Vodka </h6> 
                                     <span className={cls17}> Manager </span> 
                                 </div> 
                             </div> 
                         </div> 

                         <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                     <i className={cls9}> </i> 
                                     <p className={cls10}> &quot; There is now an abundance of readable dummy texts. These are usually used when a text is required. &quot; </p> 
                                     <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul> 
                                 </div> 
                                
                                 <div className={cls14}> 
                                     <img src="assets/images/client/05.jpg" alt="" className={cls15}/> 
                                     <h6 className={cls16}> Cristino Murfi </h6> 
                                     <span className={cls17}> Manager </span> 
                                 </div> 
                             </div> 
                         </div> 

                         <div className={cls6}> 
                             <div className={cls7}> 
                                 <div className={cls8}> 
                                     <i className={cls9}> </i> 
                                     <p className={cls10}> &quot; According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero. &quot; </p> 
                                     <ul className={cls11}> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                         <li className={cls12}> <i className={cls13}> </i> </li> 
                                     </ul> 
                                 </div> 
                                
                                 <div className={cls14}> 
                                     <img src="assets/images/client/06.jpg" alt="" className={cls15}/> 
                                     <h6 className={cls16}> Cristino Murfi </h6> 
                                     <span className={cls17}> Manager </span> 
                                 </div> 
                             </div> 
                         </div>  */}
                     </div> 
                 </div> {/*<!--end grid-->*/} 
             </div> {/*<!--end container-->*/}
    </>
 }   

 export default  ShortLembaga
    