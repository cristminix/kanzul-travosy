
 const Switcher = ({})=>{
    const styles = {  }
    const cls0 = "cls-0 fixed top-1/4 -left-2 z-50"
		const cls1 = "cls-1 relative inline-block rotate-90"
		const cls2 = "cls-2 checkbox opacity-0 absolute"
		const cls3 = "cls-3 label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
		const cls4 = "cls-4 w-[18px] h-[18px] text-yellow-500"
		const cls5 = "cls-5 ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"
		const cls6 = "cls-6 fixed top-[40%] -left-3 z-50"
		const cls7 = "cls-7 py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold rtl:block ltr:hidden"
		const cls8 = "cls-8 py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold ltr:block rtl:hidden"
		const cls9 = "cls-9 back-to-top fixed hidden text-lg rounded-md z-10 bottom-5 end-5 size-8 text-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white justify-center items-center"
		const cls10 = "cls-10 mdi mdi-arrow-up"

    return <>
    <div> 
     {/*<!-- Switcher -->*/} 
     <div className={cls0}> 
         <span className={cls1}> 
             <input type="checkbox" id="chk" className={cls2}/> 
             <label htmlFor="chk" className={cls3}> 
                 <i data-feather="moon" className={cls4}> </i> 
                 <i data-feather="sun" className={cls4}> </i> 
                 <span className={cls5}> </span> 
             </label> 
         </span> 
     </div> 

      {/* <div class="fixed top-1/2 -right-11 z-50 hidden sm:block">
        <a href="https://1.envato.market/travosy" target="_blank" class="py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold"><i class="mdi mdi-cart-outline me-1"></i> Download</a>
    </div>  */}
     {/*<!-- Switcher -->*/} 

     {/*<!-- LTR & RTL Mode Code -->*/} 
     <div className={cls6}> 
         <a href="" id="switchRtl"> 
             <span className={cls7}> LTR </span> 
             <span className={cls8}> RTL </span> 
         </a> 
     </div> 
     {/*<!-- LTR & RTL Mode Code -->*/} 

     {/*<!-- Back to top -->*/} 
     <a href="#" onclick="topFunction()" id="back-to-top" className={cls9}> <i className={cls10}> </i> </a> 
     {/*<!-- Back to top -->*/} 
 </div>
    </>
 }   

 export default  Switcher
    