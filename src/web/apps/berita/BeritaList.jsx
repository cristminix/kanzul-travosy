import { useDispatch, useSelector } from "react-redux"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"

import BeritaMainContent from "@/web/templates/sections/BeritaMainContent"

import {useEffect,useState} from "react"

const BeritaList = ({model, reload, loadingModel, byAuthor})=>{
  const beritaState = useSelector(state=>state.berita)
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(fetchBerita()) 

  }, [dispatch])
 	
	return <BeritaMainContent byAuthor={byAuthor} beritaData={beritaState.data} loadingModel={loadingModel} reload={reload} model={model}/>
}

export default BeritaList