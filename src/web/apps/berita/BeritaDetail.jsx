// import { useDispatch, useSelector } from "react-redux"
// import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"

import BeritaDetailMainContent from "@/web/templates/sections/BeritaDetailMainContent"

// import {useEffect,useState} from "react"

const BeritaDetail = ({model, reload, loadingModel,metaMode})=>{

 	
	return <BeritaDetailMainContent metaMode={metaMode} loadingModel={loadingModel} reload={reload} model={model}/>
} 
export default BeritaDetail