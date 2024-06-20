import React, { Component, Suspense, lazy, useState } from "react"
import {
  createRoutesFromElements,
  createBrowserRouter,
  createHashRouter,
  Route,
  RouterProvider,
} from "react-router-dom"

import {crc32id} from "@/global/fn/crc32id"

import {useEffect} from "react"
import {ROUTER_BASE} from "@/config.json"

import ProdukApp,{loader as produkLoader} from "@/web/apps/ProdukApp"

import ProdukDetail from "@/web/apps/produk/ProdukDetail"
import MProdukRo from "@/global/git/orm/ro/models/MProdukRo"
const mProdukRo = new MProdukRo()

const Router = ({}) => {
  const [reload,setReload]=useState('')
  const [loadingModel,setLoadingModel]=useState(false)

  const initModel= async()=>{
    setLoadingModel(true)
    await mProdukRo.initOrm()
    setReload(crc32id())
    setLoadingModel(false)
  }
  
  useEffect(() => {
    initModel()
  }, [setReload,setLoadingModel])

  // useEffect(()=>{
  //   console.info('ROUTER')
  // },[])
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="" element={<ProdukApp />}>
        <Route index={true} element={<ProdukDetail metaMode={true} model={mProdukRo} loadingModel={loadingModel}  reload={reload}/>} loader={produkLoader} />
      </Route>,
    ),
    { basename: '/' },
  )

  return <RouterProvider router={router} />
}

export default Router
