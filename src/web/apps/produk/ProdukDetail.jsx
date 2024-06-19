// import { useDispatch, useSelector } from "react-redux"
// import beritaSlice, { fetchProduk } from "@/global/store/features/beritaSlice"

import ProdukDetailMainContent from "@/web/templates/sections/ProdukDetailMainContent"

// import {useEffect,useState} from "react"

const ProdukDetail = ({model, reload, loadingModel})=>{

 	
	return <ProdukDetailMainContent loadingModel={loadingModel} reload={reload} model={model}/>
} 
export default ProdukDetail