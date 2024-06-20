import ColumnLayout from "@/web/templates/layouts/ColumnLayout" 
import {Outlet} from "react-router-dom"

const loader = async({params})=>{
  const {pageNumber,id,slug,kategori}=params
	return {
    id,slug,
    pageNumber,kategori
  }
}

const BeritaApp = ({})=>{

  return (
    <ColumnLayout>
      <Outlet/>
    </ColumnLayout>
  )
}

export {loader}
export default BeritaApp