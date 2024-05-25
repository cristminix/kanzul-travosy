
 const SearchBox = ({})=>{
    const styles = {  }
    const cls0 = "cls-0 relative py-16 bg-gray-50 dark:bg-slate-800"
		const cls1 = "cls-1 container relative"
		const cls2 = "cls-2 grid grid-cols-1"
		const cls3 = "cls-3 p-6 bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700"
		const cls4 = "cls-4 registration-form text-dark text-start"
		const cls5 = "cls-5 grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4"
		const cls6 = "cls-6 form-label font-medium text-slate-900 dark:text-white"
		const cls7 = "cls-7 relative mt-2"
		const cls8 = "cls-8 size-[18px] absolute top-[10px] start-3"
		const cls9 = "cls-9 w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
		const cls10 = "cls-10 w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 start"
		const cls11 = "cls-11 w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 end"
		const cls12 = "cls-12 form-select w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
		const cls13 = "cls-13 lg:mt-[35px]"
		const cls14 = "cls-14 py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer"

    return <>
    {/*<!-- Start -->*/} 
 <section className={cls0}> 
     <div className={cls1}> 
         <div className={cls2}> 
             <form className={cls3}> 
                 <div className={cls4}> 
                     <div className={cls5}> 
                         <div> 
                             <label className={cls6}> Search: </label> 
                             <div className={cls7}> 
                                 <i data-feather="search" className={cls8}> </i> 
                                 <input name="name" type="text" id="job-keyword" placeholder="Search" className={cls9}/> 
                             </div> 
                         </div> 

                         <div> 
                             <label className={cls6}> Select Your
                                Date: </label> 
                             <div className={cls7}> 
                                 <i data-feather="calendar" className={cls8}> </i> 
                                 <input name="name" type="text" id="job-keyword" placeholder="Select Your Date" className={cls10}/> 
                             </div> 
                         </div> 

                         <div> 
                             <label className={cls6}> Select Your
                                Date: </label> 
                             <div className={cls7}> 
                                 <i data-feather="calendar" className={cls8}> </i> 
                                 <input name="name" type="text" id="job-keyword" placeholder="Select Your Date" className={cls11}/> 
                             </div> 
                         </div> 

                         <div> 
                             <label className={cls6}> No. of
                                person: </label> 
                             <div className={cls7}> 
                                 <i data-feather="users" className={cls8}> </i> 
                                 <select className={cls12}> 
                                     <option disabled="" selected=""> No. of person </option> 
                                     <option> 1 </option> 
                                     <option> 2 </option> 
                                     <option> 3 </option> 
                                     <option> 4 </option> 
                                     <option> 5 </option> 
                                 </select> 
                             </div> 
                         </div> 

                         <div className={cls13}> 
                             <input type="submit" id="search-buy" name="search" defaultValue="Search" className={cls14}/> 
                         </div> 
                     </div> {/*<!--end grid-->*/} 
                 </div> {/*<!--end container-->*/} 
             </form> {/*<!--end form-->*/} 
         </div> {/*<!--end grid-->*/} 
     </div> {/*<!--end container-->*/} 
 </section> {/*<!--end section-->*/} 
 {/*<!-- End -->*/}
    </>
 }   

 export default  SearchBox
    