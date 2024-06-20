// import { LazyLoadImage } from "react-lazy-load-image-component"
import BeritaDisplay from "../blocks/BeritaDisplay"
const FullBeritaDetail = ({ className, berita ,loading,metaMode}) => {
  
  return (
    <>
     <BeritaDisplay  berita={berita} loading={loading} metaMode={metaMode}/>
    </>
  )
}

export default FullBeritaDetail