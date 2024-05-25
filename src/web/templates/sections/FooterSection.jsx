import FooterSocialLinkList from "../blocks/FooterSocialLinkList"
const FooterSection = ({footerData,companyData, contactPersonList, socialNetworkLinks})=>{
    // console.log(contactPersonList)
    const {footerText} = footerData
    const styles = {  }
    const cls0 = "cls-0 footer bg-dark-footer relative text-gray-200 dark:text-gray-200"
		const cls1 = "cls-1 container relative"
		const cls2 = "cls-2 grid grid-cols-12"
		const cls3 = "cls-3 col-span-12"
		const cls4 = "cls-4 py-[60px] px-0"
		const cls5 = "cls-5 grid md:grid-cols-12 grid-cols-1 gap-6"
		const cls6 = "cls-6 lg:col-span-4 md:col-span-12"
		const cls7 = "cls-7 text-[22px] focus:outline-none"
		const cls8 = "cls-8 mt-6 text-gray-300"
	
		const cls13 = "cls-13 lg:col-span-4 md:col-span-12"
		const cls14 = "cls-14 lg:ms-8"
		const cls15 = "cls-15 tracking-[1px] text-gray-100 font-semibold"
		const cls16 = "cls-16 tracking-[1px] text-gray-100 mt-6"
		const cls17 = "cls-17 flex mt-4"
		const cls18 = "cls-18 size-4 text-red-500 me-2 mt-1"
		const cls19 = "cls-19 "
		const cls20 = "cls-20 text-gray-300"
		const cls21 = "cls-21 text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
		const cls22 = "cls-22 list-none footer-list mt-6"
		const cls23 = "cls-23 text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
		const cls24 = "cls-24 mdi mdi-chevron-right"
		const cls25 = "cls-25 mt-[10px]"
		const cls26 = "cls-26 mt-6"
		const cls27 = "cls-27 grid grid-cols-1"
		const cls28 = "cls-28 my-3"
		const cls29 = "cls-29 form-label"
		const cls30 = "cls-30 text-red-600"
		const cls31 = "cls-31 form-icon relative mt-2"
		const cls32 = "cls-32 size-4 absolute top-3 start-4"
		const cls33 = "cls-33 ps-12 rounded w-full py-2 px-3 h-10 bg-gray-800 border-0 text-gray-100 focus:shadow-none focus:ring-0 placeholder:text-gray-200 outline-none"
		const cls34 = "cls-34 py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
		const cls35 = "cls-35 py-[30px] px-0 border-t border-slate-800"
		const cls36 = "cls-36 container relative text-center"
		const cls37 = "cls-37 text-center"
		const cls38 = "cls-38 mb-0"
		const cls39 = "cls-39 mdi mdi-heart text-red-600"
		const cls40 = "cls-40 text-reset"

    return <>
    {/*<!-- Footer Start -->*/} 
 <footer className={cls0}> 
     <div className={cls1}> 
         <div className={cls2}> 
             <div className={cls3}> 
                 <div className={cls4}> 
                     <div className={cls5}> 
                         <div className={cls6}> 
                             <a href="#" className={cls7}> 
                                 <img src="/assets/images/logo/logo-light.png" alt="Ponpes Kanzululum" className="max-w-[50%]"/> 
                             </a> 
                             <p className={cls8}> Merencanakan pendidikan pesantren? Kami akan mengatur pendidikan Anda dengan kurikulum terbaik dan biaya yang terjangkau! </p> 
                             <FooterSocialLinkList socialNetworkLinks={socialNetworkLinks}/>
                         </div> {/*<!--end col-->*/} 

                         <div className={cls13}> 
                             <div className={cls14}> 
                                 <h5 className={cls15}> Alamat </h5> 
                                 <h5 className={cls16}> Yayasan Kanzululum</h5> 

                                 <div className={cls17}> 
                                     <i data-feather="map-pin" className={cls18}> </i> 
                                     <div className={cls19}> 
                                         <h6 className={cls20}> {companyData.address}</h6> 
                                     </div> 
                                 </div> 

                                 
                             </div> 
                         </div> {/*<!--end col-->*/} 

                         {/* <div className={cls13}> 
                             <div className={cls14}> 
                                 <h5 className={cls15}> Company </h5> 
                                 <ul className={cls22}> 
                                     <li> <a href="aboutus.html" className={cls23}> <i className={cls24}> </i>  About us </a> </li> 
                                     <li className={cls25}> <a href="services.html" className={cls23}> <i className={cls24}> </i>  Services </a> </li> 
                                     <li className={cls25}> <a href="team.html" className={cls23}> <i className={cls24}> </i>  Team </a> </li> 
                                     <li className={cls25}> <a href="pricing.html" className={cls23}> <i className={cls24}> </i>  Pricing </a> </li> 
                                     <li className={cls25}> <a href="blogs.html" className={cls23}> <i className={cls24}> </i>  Blog </a> </li> 
                                     <li className={cls25}> <a href="login.html" className={cls23}> <i className={cls24}> </i>  Login </a> </li> 
                                 </ul> 
                             </div> 
                         </div>  */}
                         {/*<!--end col-->*/} 

                         <div className={cls13}> 
                             <h5 className={cls15}> Kontak Person </h5> 
                             <p className={cls26}> Anda bisa menghubungi kami kapan saja. </p> 
                             {contactPersonList.map((item,index)=>{
                                 return <div className={cls17} key={index}> 
                                 <i data-feather="phone" className={cls18}> </i> 
                                 <div className={cls19}> 
                                     <a href={`tel:${item.phone}`} className={cls21}> {item.phone} </a> ({item.name}) 
                                 </div> 
                             </div> 
                             })}
                             <div className={cls17} > 
                                 <i data-feather="mail" className={cls18}> </i> 
                                 <div className={cls19}> 
                                     <a href={`mailto:${companyData.email}`} className={cls21}> {companyData.email} </a>  
                                 </div> 
                             </div> 
                         </div> {/*<!--end col-->*/} 
                     </div> {/*<!--end grid-->*/} 
                 </div> {/*<!--end col-->*/} 
             </div> 
         </div> {/*<!--end grid-->*/} 
     </div> {/*<!--end container-->*/} 

     <div className={cls35}> 
         <div className={cls36}> 
             <div className={cls27}> 
                 <div className={cls37}> 
                     <p className={cls38}> &#xa9;
                         {footerText}
                     </p> 
                 </div> 
             </div> {/*<!--end grid-->*/} 
         </div> {/*<!--end container-->*/} 
     </div> 
 </footer> {/*<!--end footer-->*/} 
 {/*<!-- Footer End -->*/}
    </>
 }   

 export default  FooterSection
    