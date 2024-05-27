
 const ShortBeritaList = ({beritaList})=>{
    const styles = {  }
    const cls0 = "cls-0 container relative md:mt-24 mt-16"
		const cls1 = "cls-1 grid grid-cols-1 pb-6 text-center"
		const cls2 = "cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
		const cls3 = "cls-3 text-slate-400 max-w-xl mx-auto"
		const cls4 = "cls-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6"
		const cls5 = "cls-5 group relative overflow-hidden"
		const cls6 = "cls-6 relative overflow-hidden rounded-md shadow dark:shadow-gray-800"
		const cls7 = "cls-7 group-hover:scale-110 group-hover:rotate-3 duration-500"
		const cls8 = "cls-8 absolute top-0 start-0 p-4 opacity-0 group-hover:opacity-100 duration-500"
		const cls9 = "cls-9 bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5"
		const cls10 = "cls-10 mt-6"
		const cls11 = "cls-11 flex mb-4"
		const cls12 = "cls-12 flex items-center text-slate-400 text-sm"
		const cls13 = "cls-13 size-4 text-slate-900 dark:text-white me-1.5"
		const cls14 = "cls-14 text-slate-400 text-sm ms-3"
		const cls15 = "cls-15 text-slate-900 dark:text-white hover:text-red-500 dark:hover:text-red-500 font-medium"
		const cls16 = "cls-16 text-lg font-medium hover:text-red-500 duration-500 ease-in-out"
		const cls17 = "cls-17 text-slate-400 mt-2"
		const cls18 = "cls-18 mt-3"
		const cls19 = "cls-19 hover:text-red-500 inline-flex items-center"
		const cls20 = "cls-20 size-4 ms-1"

    return <>
      <div className={cls0}> 
                 <div className={cls1}> 
                     <h3 className={cls2}> Berita </h3> 

                     <p className={cls3}> Baca berita dan informasi dari kami. </p> 
                 </div> {/*<!--end grid-->*/} 

                 <div className={cls4}> 
                 {beritaList.map((post,index)=>{
                    const postUrl=`/berita/${post.slug}.html`
                    return <div className={cls5} key={index}> 
                         <div className={cls6}> 
                             <img src={post.cover} alt={post.title} className={cls7}/> 
                             <div className={cls8}> 
                                 <span className={cls9}> {post.tags} </span> 
                             </div> 
                         </div> 

                         <div className={cls10}> 
                             <div className={cls11}> 
                                 <span className={cls12}> <i data-feather="clock" className={cls13}> </i> {post.readTime?`${post.readTime} min baca`:null}  </span> 
                                 <span className={cls14}> oleh  <a href="" className={cls15}> {post.author?`${post.author}`:'Admin'} </a> </span> 
                             </div> 

                             <a href={postUrl} className={cls16}> {post.title} </a> 
                             <p className={cls17}> {post.headline} </p> 

                             <div className={cls18}> 
                                 <a href={postUrl} className={cls19}> Selengkapnya  <i data-feather="chevron-right" className={cls20}> </i> </a> 
                             </div> 
                         </div> 
                     </div>
                 })}
                     
                 </div> {/*<!--end grid-->*/} 
             </div> {/*<!--end container-->*/}
    </>
 }   

 export default  ShortBeritaList
    