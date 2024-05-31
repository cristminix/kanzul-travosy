import React, { Component } from "react"

import { withRouter } from "@/global/fn/withRouter"

import "./App.scss"
// import AppRoutes from "./AppRoutes"
import Navbar from "./shared/Navbar"
import Sidebar from "./shared/Sidebar"
import SettingsPanel from "./shared/SettingsPanel"
import Footer from "./shared/Footer"
import { withTranslation } from "react-i18next"
import "@mdi/font/css/materialdesignicons.min.css"
import "@/global/fn/reachHideWarning"
import "@/global/css/tailwind.css"
import "@/global/css/purple.css"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
// import contentSlice from "@/global/store/features/contentSlice"
import Spinner from "@/app/shared/Spinner"

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.min.js"

const App = ({ props }) => {
  const location = useLocation()
  const [isFullPageLayout, setIsFullPageLayout] = useState(false)
  const [contentIsLoading,setContentIsLoading]=useState(true)

   // const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  // const {setLoading} = contentSlice.actions

  const onRouteChanged = () => {
    console.log("ROUTE CHANGED")
    console.log(props)
    // const { i18n } = props
    const body = document.querySelector("body")
    if (location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl")
      // i18n.changeLanguage("ar")
    } else {
      body.classList.remove("rtl")
      // i18n.changeLanguage("en")
    }
    window.scrollTo(0, 0)
    const fullPageLayoutRoutes = [
      "/user-pages/login-1",
      "/user-pages/register-1",
      "/user-pages/lockscreen",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/general-pages/landing-page",
    ]
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true)

        document.querySelector(".page-body-wrapper").classList.add("full-page-wrapper")
        break
      } else {
        setIsFullPageLayout(false)
        document.querySelector(".page-body-wrapper").classList.remove("full-page-wrapper")
      }
    }
  }
  useEffect(() => {
    onRouteChanged()
  }, [])
  let navbarComponent = !isFullPageLayout ? <Navbar /> : ""
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : ""
  let SettingsPanelComponent = !isFullPageLayout ? <SettingsPanel /> : ""
  let footerComponent = !isFullPageLayout ? <Footer /> : ""
  return (
    <div className="container-scroller">
      {navbarComponent}
      <div className="container-fluid page-body-wrapper">
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            {
              contentState.isLoading ? <Spinner message={contentState.loadingMessage}/> : null
            }
            {/*<div className={`${contentIsLoading?'spinner-wrapper':''}`}>*/}
              <Outlet />
            {/*</div>*/}
            
            {SettingsPanelComponent}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  )

  // componentDidUpdate(prevProps) {
  //   if (location !== prevProps.location) {
  //     this.onRouteChanged()
  //   }
  // }
}

export default App
