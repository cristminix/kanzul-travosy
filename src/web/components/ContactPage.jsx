
 const ContactPage = ({})=>{
    const styles = {  stl0 : { border : "0" }, }
    const cls0 = "cls-0 container-fluid relative mt-20"
		const cls1 = "cls-1 grid grid-cols-1"
		const cls2 = "cls-2 w-full leading-[0] border-0"
		const cls3 = "cls-3 w-full h-[500px]"
		const cls4 = "cls-4 relative lg:py-24 py-16"
		const cls5 = "cls-5 container"
		const cls6 = "cls-6 grid md:grid-cols-12 grid-cols-1 items-center gap-6"
		const cls7 = "cls-7 lg:col-span-7 md:col-span-6"
		const cls8 = "cls-8 w-full max-w-[500px] mx-auto"
		const cls9 = "cls-9 lg:col-span-5 md:col-span-6"
		const cls10 = "cls-10 lg:ms-5"
		const cls11 = "cls-11 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6"
		const cls12 = "cls-12 mb-6 text-2xl leading-normal font-semibold"
		const cls13 = "cls-13 mb-0"
		const cls14 = "cls-14 grid lg:grid-cols-12 grid-cols-1 gap-3"
		const cls15 = "cls-15 lg:col-span-6"
		const cls16 = "cls-16 font-semibold"
		const cls17 = "cls-17 mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
		const cls18 = "cls-18 lg:col-span-12"
		const cls19 = "cls-19 mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
		const cls20 = "cls-20 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
		const cls21 = "cls-21 container lg:mt-24 mt-16"
		const cls22 = "cls-22 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6"
		const cls23 = "cls-23 text-center px-6"
		const cls24 = "cls-24 relative text-transparent"
		const cls25 = "cls-25 size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800"
		const cls26 = "cls-26 content mt-7"
		const cls27 = "cls-27 h5 text-lg font-semibold"
		const cls28 = "cls-28 text-slate-400 mt-3"
		const cls29 = "cls-29 mt-5"
		const cls30 = "cls-30 text-red-500 font-medium"
		const cls31 = "cls-31 video-play-icon read-more lightbox text-red-500 font-medium"

    return <>
    {/*<!-- Google Map -->*/} 
         <div className={cls0}> 
             <div className={cls1}> 
                 <div className={cls2}> 
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" allowfullscreen="" className={cls3} style={styles.stl0}> </iframe> 
                 </div> 
             </div> {/*<!--end grid-->*/} 
         </div> {/*<!--end container-->*/} 
         {/*<!-- Google Map -->*/} 

         {/*<!-- Start Section-->*/} 
         <section className={cls4}> 
             <div className={cls5}> 
                 <div className={cls6}> 
                     <div className={cls7}> 
                         <img src="assets/images/travel-train-station.svg" alt="" className={cls8}/> 
                     </div> 

                     <div className={cls9}> 
                         <div className={cls10}> 
                             <div className={cls11}> 
                                 <h3 className={cls12}> Get in touch ! </h3> 

                                 <form method="post" name="myForm" id="myForm" onsubmit="return validateForm()"> 
                                     <p id="error-msg" className={cls13}> </p> 
                                     <div id="simple-msg"> </div> 
                                     <div className={cls14}> 
                                         <div className={cls15}> 
                                             <label htmlFor="name" className={cls16}> Your Name: </label> 
                                             <input name="name" id="name" type="text" placeholder="Name :" className={cls17}/> 
                                         </div> 
        
                                         <div className={cls15}> 
                                             <label htmlFor="email" className={cls16}> Your Email: </label> 
                                             <input name="email" id="email" type="email" placeholder="Email :" className={cls17}/> 
                                         </div> 

                                         <div className={cls18}> 
                                             <label htmlFor="subject" className={cls16}> Your Question: </label> 
                                             <input name="subject" id="subject" placeholder="Subject :" className={cls17}/> 
                                         </div> 
    
                                         <div className={cls18}> 
                                             <label htmlFor="comments" className={cls16}> Your Comment: </label> 
                                             <textarea name="comments" id="comments" placeholder="Message :" className={cls19}/> 
                                         </div> 
                                     </div> 
                                     <button type="submit" id="submit" name="send" className={cls20}> Send Message </button> 
                                 </form> 
                             </div> 
                         </div> 
                     </div> 
                 </div> 
             </div> {/*<!--end container-->*/} 
            
             <div className={cls21}> 
                 <div className={cls22}> 
                     <div className={cls23}> 
                         <div className={cls24}> 
                             <div className={cls25}> 
                                 <i data-feather="phone"> </i> 
                             </div> 
                         </div> 

                         <div className={cls26}> 
                             <h5 className={cls27}> Phone </h5> 
                             <p className={cls28}> The phrasal sequence of the is now so that many campaign and benefit </p> 
                            
                             <div className={cls29}> 
                                 <a href="tel:+152534-468-854" className={cls30}> +152 534-468-854 </a> 
                             </div> 
                         </div> 
                     </div> 

                     <div className={cls23}> 
                         <div className={cls24}> 
                             <div className={cls25}> 
                                 <i data-feather="mail"> </i> 
                             </div> 
                         </div> 

                         <div className={cls26}> 
                             <h5 className={cls27}> Email </h5> 
                             <p className={cls28}> The phrasal sequence of the is now so that many campaign and benefit </p> 
                            
                             <div className={cls29}> 
                                 <a href="mailto:contact@example.com" className={cls30}> contact@example.com </a> 
                             </div> 
                         </div> 
                     </div> 

                     <div className={cls23}> 
                         <div className={cls24}> 
                             <div className={cls25}> 
                                 <i data-feather="map-pin"> </i> 
                             </div> 
                         </div> 

                         <div className={cls26}> 
                             <h5 className={cls27}> Location </h5> 
                             <p className={cls28}> C/54 Northwest Freeway, Suite 558,  <br/>  Houston, USA 485 </p> 
                            
                             <div className={cls29}> 
                                 <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" data-type="iframe" className={cls31}> View on Google map </a> 
                             </div> 
                         </div> 
                     </div> 
                 </div> {/*<!--end grid-->*/} 
             </div> {/*<!--end container-->*/} 
         </section> {/*<!--end section-->*/} 
         {/*<!-- End Section-->*/} 

    </>
 }   

 export default  ContactPage
    