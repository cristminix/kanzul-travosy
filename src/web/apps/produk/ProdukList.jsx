import { useDispatch, useSelector } from "react-redux"
import produkSlice, { fetchProduk } from "@/global/store/features/produkSlice"

import ProdukMainContent from "@/web/templates/sections/ProdukMainContent"

import {useEffect,useState} from "react"

const ProdukList = ({model, reload, loadingModel, byKategori})=>{
  const produkState = useSelector(state=>state.produk)
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(fetchProduk()) 

  }, [dispatch])
 	
	return <ProdukMainContent byKategori={byKategori} produkData={produkState.data} loadingModel={loadingModel} reload={reload} model={model}/>
}

export default ProdukList