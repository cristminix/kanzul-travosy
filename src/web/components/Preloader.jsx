
 const Preloader = ({})=>{
    const styles = {  }
    const cls0 = "cls-0 spinner"
		const cls1 = "cls-1 double-bounce1"
		const cls2 = "cls-2 double-bounce2"

    return <>
    {/*<!-- Loader Start -->*/} 
 <div id="preloader"> 
     <div id="status"> 
         <div className={cls0}> 
             <div className={cls1}> </div> 
             <div className={cls2}> </div> 
         </div> 
     </div> 
 </div> 
 {/*<!-- Loader End -->*/}
    </>
 }   

 export default  Preloader
    