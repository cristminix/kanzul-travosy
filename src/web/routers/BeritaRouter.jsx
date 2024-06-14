import React, { Component, Suspense, lazy } from "react"
import {
  createRoutesFromElements,
  createBrowserRouter,
  createHashRouter,
  Route,
  RouterProvider,
} from "react-router-dom"

// Change according your index.html location

import {ROUTER_BASE} from "@/config.json"

import BeritaApp,{loader as beritaLoader} from "@/web/apps/BeritaApp"
import BeritaList from "@/web/apps/berita/BeritaList"
import BeritaListByAuthor from "@/web/apps/berita/BeritaListByAuthor"
import BeritaDetail from "@/web/apps/berita/BeritaDetail"


const Router = ({}) => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="" element={<BeritaApp />}>
        <Route path="page/:pageNumber" element={<BeritaList />} loader={beritaLoader} />
        <Route path="penulis/:author/page/:pageNumber" element={<BeritaListByAuthor />} loader={beritaLoader} />
        <Route path="baca/:id/:slug" element={<BeritaDetail />} loader={beritaLoader} />

      </Route>,
    ),
    { basename: '/' },
  )

  return <RouterProvider router={router} />
}

export default Router
