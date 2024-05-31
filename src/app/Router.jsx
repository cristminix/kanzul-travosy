import React, { Component, Suspense, lazy } from "react"
import {
  createRoutesFromElements,
  createBrowserRouter,
  createHashRouter,
  Route,
  RouterProvider,
} from "react-router-dom"

// Change according your index.html location
const ROUTER_BASE = "/purple"

//

const Dashboard = lazy(() => import("./dashboard/Dashboard"))

const Buttons = lazy(() => import("./basic-ui/Buttons"))
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"))
const Typography = lazy(() => import("./basic-ui/Typography"))

const BasicElements = lazy(() => import("./form-elements/BasicElements"))

const BasicTable = lazy(() => import("./tables/BasicTable"))

const Mdi = lazy(() => import("./icons/Mdi"))

const ChartJs = lazy(() => import("./charts/ChartJs"))

const Error404 = lazy(() => import("./error-pages/Error404"))
const Error500 = lazy(() => import("./error-pages/Error500"))

const Login = lazy(() => import("./user-pages/Login"))
const Register1 = lazy(() => import("./user-pages/Register"))
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"))

const BlankPage = lazy(() => import("./general-pages/BlankPage"))
// import AppTemplate from "./AppTemplate"
import App from "./App"
import ContentPage, { loader as contentPageLoader } from "./content-pages/ContentPage"
import Spinner from "./shared/Spinner"
const Router = ({}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route path="dashboard" element={<Suspense fallback={<Spinner/>}><Dashboard /></Suspense>} />

        <Route path="basic-ui/buttons" element={<Suspense fallback={<Spinner/>}><Buttons /></Suspense>} />
        <Route path="contents" element={<ContentPage />} loader={contentPageLoader} />
        <Route path="contents/:module" element={<ContentPage />} loader={contentPageLoader} />

        <Route path="basic-ui/dropdowns" element={<Suspense fallback={<Spinner/>}><Dropdowns /></Suspense>} />
        <Route path="basic-ui/typography" element={<Suspense fallback={<Spinner/>}><Typography /></Suspense>} />

        <Route path="form-Elements/basic-elements" element={<Suspense fallback={<Spinner/>}><BasicElements /></Suspense>} />

        <Route path="tables/basic-table" element={<Suspense fallback={<Spinner/>}><BasicTable /></Suspense>} />

        <Route path="icons/mdi" element={<Suspense fallback={<Spinner/>}><Mdi /></Suspense>} />

        <Route path="charts/chart-js" element={<Suspense fallback={<Spinner/>}><ChartJs /></Suspense>} />

        <Route path="user-pages/login-1" element={<Suspense fallback={<Spinner/>}><Login /></Suspense>} />
        <Route path="user-pages/register-1" element={<Suspense fallback={<Spinner/>}><Register1 /></Suspense>} />
        <Route path="user-pages/lockscreen" element={<Suspense fallback={<Spinner/>}><Lockscreen /></Suspense>} />

        <Route path="error-pages/error-404" element={<Suspense fallback={<Spinner/>}><Error404 /></Suspense>} />
        <Route path="error-pages/error-500" element={<Suspense fallback={<Spinner/>}><Error500 /></Suspense>} />

        <Route path="general-pages/blank-page" element={<Suspense fallback={<Spinner/>}><BlankPage /></Suspense>} />

        {/*<Navigate to="/dashboard" />*/}
      </Route>,
    ),
    { basename: ROUTER_BASE },
  )

  return <RouterProvider router={router} />
}

export default Router
