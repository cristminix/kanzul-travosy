// import { LazyLoadImage } from "react-lazy-load-image-component"
import ProdukDisplay from "../blocks/ProdukDisplay"
const FullProdukDetail = ({ className, produk ,loading,metaMode}) => {
  
  return (
    <>
     <ProdukDisplay  produk={produk} loading={loading} metaMode={metaMode}/>
    </>
  )
}

export default FullProdukDetail