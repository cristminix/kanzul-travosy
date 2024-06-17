// import { LazyLoadImage } from "react-lazy-load-image-component"
import BeritaDisplay from "../blocks/BeritaDisplay"
const FullBeritaDetail = ({ className, berita ,loading}) => {
  
  return (
    <>
     <BeritaDisplay  berita={berita} loading={loading}/>
    </>
  )
}

export default FullBeritaDetail