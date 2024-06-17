
 import UserMenu from "./UserMenu"
 import Navigation from "./Navigation"
 const NavBar = ({webNavigationList})=>{
    const styles = {  }
    const cls0 = "cls-0 defaultscroll is-sticky tagline-height"
		const cls1 = "cls-1 container relative"
		const cls2 = "cls-2 logo"
		const cls3 = "cls-3 inline-block dark:hidden"
		const cls4 = "cls-4 h-7 l-dark"
		const cls5 = "cls-5 h-7 l-light"
		const cls6 = "cls-6 hidden dark:inline-block"
		const cls7 = "cls-7 menu-extras"
		const cls8 = "cls-8 menu-item"
		const cls9 = "cls-9 navbar-toggle"
		const cls10 = "cls-10 lines"
		

    return <>
      {/*<!-- Start Navbar -->*/} 
     <nav id="topnav" className={cls0}> 
         <div className={cls1}> 
             {/*<!-- Logo container-->*/} 
             <a href="/" className={cls2}> 
                 <span className={cls3}> 
                     <img src="/assets/images/logo/logo-dark.png" alt="" className={cls4}/> 
                     <img src="/assets/images/logo/logo-light.png" alt="" className={cls5}/> 
                 </span> 
                 <img src="/assets/images/logo/logo-white.png" alt="" className={cls6}/> 
             </a> 
             {/*<!-- End Logo container-->*/} 

             {/*<!-- Start Mobile Toggle -->*/} 
             <div className={cls7}> 
                 <div className={cls8}> 
                     <a id="isToggle" onClick={e=>toggleMenu()} className={cls9}> 
                         <div className={cls10}> 
                             <span> </span> 
                             <span> </span> 
                             <span> </span> 
                         </div> 
                     </a> 
                 </div> 
             </div> 
             {/*<!-- End Mobile Toggle -->*/} 
{/* 
             <UserMenu/> */}
             <Navigation webNavigationList={webNavigationList}/>
         </div> {/*<!--end container-->*/} 
     </nav> {/*<!--end header-->*/} 
     {/*<!-- End Navbar -->*/}
  
    </>
 }   

 export default  NavBar
    