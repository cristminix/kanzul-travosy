// import { LazyLoadImage } from "react-lazy-load-image-component"
import ProdukDisplay from "../blocks/ProdukDisplay"
const FullProdukDetail = ({ className, produk ,loading}) => {
  
  return (
    <>
     <ProdukDisplay  produk={produk} loading={loading}/>
    </>
  )
}

export default FullProdukDetail