import React, { Component, Suspense, lazy } from "react"
import {
  createRoutesFromElements,
  createBrowserRouter,
  createHashRouter,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom"

// Change according your index.html location

const Error404 = lazy(() => import("./error-pages/Error404"))
const Error500 = lazy(() => import("./error-pages/Error500"))

const Login = lazy(() => import("./user-pages/Login"))
// import AppTemplate from "./AppTemplate"

import ContentPage, { loader as contentPageLoader } from "./content-pages/ContentPage"
import Spinner from "./shared/Spinner"
import { loadBackend } from "@/global/backend"
// import { useAuth } from "@/global/firebase/auth"
import PrivateRoutes from "./PrivateRoutes"

import CONFIG from "@/config.json"
const ROUTER_BASE = CONFIG.ROUTER_BASE
const setting = loadBackend(CONFIG)
const authProvider = setting.getProvider()
const { useAuth } = authProvider

const Router = ({}) => {
  const { isLoading, user } = useAuth()
  const isAuthed = !!user
  const isLogedIn = isAuthed
  // console.log({ isLoading, user })
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        path=""
        element={<PrivateRoutes isLoading={isLoading} isAuthed={isAuthed} isLogedIn={isLogedIn}></PrivateRoutes>}>
        <Route path="contents" element={<ContentPage />} loader={contentPageLoader} />
        <Route path="contents/:mod" element={<ContentPage />} loader={contentPageLoader} />
        <Route path="contents/:mod/:sub" element={<ContentPage />} loader={contentPageLoader} />
        <Route path="contents/:mod/:sub/:pk" element={<ContentPage />} loader={contentPageLoader} />

        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="error-pages/error-404"
          element={
            <Suspense fallback={<Spinner />}>
              <Error404 />
            </Suspense>
          }
        />
        <Route
          path="error-pages/error-500"
          element={
            <Suspense fallback={<Spinner />}>
              <Error500 />
            </Suspense>
          }
        />

        {/*<Navigate to="/dashboard" />*/}
      </Route>,
    ),
    { basename: ROUTER_BASE },
  )

  return <RouterProvider router={router} />
}

export default Router
