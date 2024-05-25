const UserMenu = ({})=>{
    const cls11 = "cls-11 buy-button list-none mb-0"
		const cls12 = "cls-12 dropdown inline-block relative pe-1"
		const cls13 = "cls-13 dropdown-toggle align-middle inline-flex search-dropdown"
		const cls14 = "cls-14 size-5 dark-icon"
		const cls15 = "cls-15 size-5 white-icon text-white"
		const cls16 = "cls-16 dropdown-menu absolute overflow-hidden end-0 m-0 mt-5 z-10 md:w-52 w-48 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 hidden"
		const cls17 = "cls-17 relative"
		const cls18 = "cls-18 size-4 absolute top-[9px] end-3"
		const cls19 = "cls-19 h-9 px-3 pe-10 w-full border-0 focus:ring-0 outline-none"
		const cls20 = "cls-20 dropdown inline-block relative ps-0.5"
		const cls21 = "cls-21 dropdown-toggle items-center"
		const cls22 = "cls-22 size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border border-red-500 bg-red-500 text-white"
		const cls23 = "cls-23 rounded-md"
		const cls24 = "cls-24 dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 hidden"
		const cls25 = "cls-25 py-2 text-start"
		const cls26 = "cls-26 flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white"
		const cls27 = "cls-27 size-4 me-2"
		const cls28 = "cls-28 border-t border-gray-100 dark:border-gray-800 my-2"
	
    return <>
    {/*<!--Login button Start-->*/} 
    <ul className={cls11}> 
                 <li className={cls12}> 
                     <button data-dropdown-toggle="dropdown" type="button" className={cls13}> 
                         <i data-feather="search" className={cls14}> </i> 
                         <i data-feather="search" className={cls15}> </i> 
                     </button> 
                     {/*<!-- Dropdown menu -->*/} 
                     <div onclick="event.stopPropagation();" className={cls16}> 
                         <div className={cls17}> 
                             <i data-feather="search" className={cls18}> </i> 
                             <input type="text" name="s" id="searchItem" placeholder="Search..." className={cls19}/> 
                         </div> 
                     </div> 
                 </li> 

                 <li className={cls20}> 
                     <button data-dropdown-toggle="dropdown" type="button" className={cls21}> 
                         <span className={cls22}> <img src="/assets/images/client/16.jpg" alt="" className={cls23}/> </span> 
                     </button> 
                     {/*<!-- Dropdown menu -->*/} 
                     <div onclick="event.stopPropagation();" className={cls24}> 
                         <ul className={cls25}> 
                             <li> 
                                 <a href="user-profile.html" className={cls26}> <i data-feather="user" className={cls27}> </i> Profile </a> 
                             </li> 
                             <li> 
                                 <a href="helpcenter.html" className={cls26}> <i data-feather="help-circle" className={cls27}> </i> Helpcenter </a> 
                             </li> 
                             <li> 
                                 <a href="user-setting.html" className={cls26}> <i data-feather="settings" className={cls27}> </i> Settings </a> 
                             </li> 
                             <li className={cls28}> </li> 
                             <li> 
                                 <a href="login.html" className={cls26}> <i data-feather="log-out" className={cls27}> </i> Logout </a> 
                             </li> 
                         </ul> 
                     </div> 
                 </li> {/*<!--end dropdown-->*/} 
             </ul> 
             {/*<!--Login button End-->*/} 

    </>
}
export default UserMenu