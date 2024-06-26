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

import BeritaApp,{loader as beritaLoader} from "@/web/apps/BeritaApp"
import BeritaDetail from "@/web/apps/berita/BeritaDetail"
import MBeritaRo from "@/global/git/orm/ro/models/MBeritaRo"
const mBeritaRo = new MBeritaRo()

const Router = ({}) => {
  const [reload,setReload]=useState('')
  const [loadingModel,setLoadingModel]=useState(false)

  const initModel= async()=>{
    setLoadingModel(true)
    await mBeritaRo.initOrm()
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
      <Route path="" element={<BeritaApp />}>
        <Route index={true} element={<BeritaDetail metaMode={true} model={mBeritaRo} loadingModel={loadingModel}  reload={reload}/>} loader={beritaLoader} />
      </Route>,
    ),
    { basename: '/' },
  )

  return <RouterProvider router={router} />
}

export default Router
