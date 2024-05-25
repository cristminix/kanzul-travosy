import { useEffect } from "react"

 const Hero = ({})=>{
    useEffect(()=>{
        //=========================================//
/*            10) Swiper slider            */
//=========================================//
try {
    var menu = [];
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },

            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },

            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    // DATA BACKGROUND IMAGE
    var swiper = new Swiper(".swiper-container", swiperOptions);

    let data = document.querySelectorAll(".slide-bg-image")
    data.forEach((e) => {
        e.style.backgroundImage =
        `url(${e.getAttribute('data-background')})`;
    })
} catch (err) {
    console.log(err)
}
    })
    const styles = {  }
    const cls0 = "cls-0 swiper-slider-hero relative block h-screen"
		const cls1 = "cls-1 swiper-container absolute end-0 top-0 w-full h-full"
		const cls2 = "cls-2 swiper-wrapper"
		const cls3 = "cls-3 swiper-slide flex items-center overflow-hidden"
		const cls4 = "cls-4 slide-inner absolute end-0 top-0 w-full h-full slide-bg-image flex items-center bg-center;"
		const cls5 = "cls-5 absolute inset-0 bg-black/70"
		const cls6 = "cls-6 container relative"
		const cls7 = "cls-7 grid grid-cols-1"
		const cls8 = "cls-8 text-center"
		const cls9 = "cls-9 mx-auto w-[300px]"
		const cls10 = "cls-10 font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5"
		const cls11 = "cls-11 text-white/70 text-xl max-w-xl mx-auto"
		const cls12 = "cls-12 mt-6"
		const cls13 = "cls-13 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
		const cls14 = "cls-14 swiper-pagination"

    return <>
    {/*<!-- Start Hero -->*/} 
 <section id="home" className={cls0}> 
     <div className={cls1}> 
         <div className={cls2}> 
             <div className={cls3}> 
                 <div data-background="/assets/images/homepage-slide/slide-1.jpg" className={cls4}> 
                     <div className={cls5}> </div> 
                     <div className={cls6}> 
                         <div className={cls7}> 
                             <div className={cls8}> 
                                 <img src="/assets/images/map-plane.png" alt="" className={cls9}/> 
                                 <h1 className={cls10}> 
                                    Pilihan pendidikan  <br/>  Yang Tepat </h1> 
                                 <p className={cls11}> Merencanakan pendidikan yang berkualitas? Kami akan mengatur pengalaman belajar Anda di pondok pesantren terbaik dengan fasilitas unggulan dan biaya yang terjangkau! </p> 

                                 <div className={cls12}> 
                                     <a href="" className={cls13}> Selengkapnya </a> 
                                 </div> 
                             </div> 
                         </div> {/*<!--end grid-->*/} 
                     </div> {/*<!--end container-->*/} 
                 </div> {/*<!-- end slide-inner -->*/} 
             </div>   {/*<!-- end swiper-slide -->*/} 

             <div className={cls3}> 
                 <div data-background="/assets/images/homepage-slide/slide-2.jpg" className={cls4}> 
                     <div className={cls5}> </div> 
                     <div className={cls6}> 
                         <div className={cls7}> 
                             <div className={cls8}> 
                                 <img src="/assets/images/map-plane.png" alt="" className={cls9}/> 
                                 <h1 className={cls10}> 
                                    Temukan  <br/>  Guru dan Pengajar Terbaik </h1> 
                                 <p className={cls11}> Berencana memondokkan buah hati? Kami siap membantu anda, kami menyiapkan guru dan pengajar yang mumpuni dalam menunjang pendidikan dan akhlak buah hati anda! </p> 

                                 <div className={cls12}> 
                                     <a href="" className={cls13}> Selengkapnya </a> 
                                 </div> 
                             </div> 
                         </div> {/*<!--end grid-->*/} 
                     </div> {/*<!--end container-->*/} 
                 </div> {/*<!-- end slide-inner -->*/} 
             </div>   {/*<!-- end swiper-slide -->*/} 
         </div> 
         {/*<!-- end swiper-wrapper -->*/} 

         {/*<!-- swipper controls -->*/} 
         <div className={cls14}> </div> 
    
           {/* <div class="swiper-button-next bg-transparent w-[35px] h-[35px] leading-[35px] -mt-[30px] bg-none border border-solid border-white/50 text-white hover:bg-red-500 hover:border-red-500 rounded-full text-center"></div>
            <div class="swiper-button-prev bg-transparent w-[35px] h-[35px] leading-[35px] -mt-[30px] bg-none border border-solid border-white/50 text-white hover:bg-red-500 hover:border-red-500 rounded-full text-center"></div> 
     */}
     </div> {/*<!--end container-->*/} 
 </section> {/*<!--end section-->*/} 
 {/*<!-- Hero End -->*/}
    </>
 }   

 export default  Hero
    