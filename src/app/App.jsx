import React, { Component } from "react"
import "./App.css"
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
import Spinner from "@/app/shared/Spinner"
import "bootstrap-icons/font/bootstrap-icons.css"

const App = ({ isLogedIn }) => {
  const location = useLocation()
  const [isFullPageLayout, setIsFullPageLayout] = useState(false)
  const [contentIsLoading, setContentIsLoading] = useState(true)

  const contentState = useSelector((state) => state.content)

  const onRouteChanged = () => {
    const body = document.querySelector("body")
    if (location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl")
    } else {
      body.classList.remove("rtl")
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
    try {
      onRouteChanged()
    } catch (e) {}
  }, [])
  let navbarComponent = !isFullPageLayout ? <Navbar /> : ""
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : ""
  let SettingsPanelComponent = !isFullPageLayout ? <SettingsPanel /> : ""
  let footerComponent = !isFullPageLayout ? <Footer /> : ""
  if (!isLogedIn) {
    return <Outlet />
  }
  return (
    <div className="container-scroller">
      {navbarComponent}
      <div className="container-fluid page-body-wrapper">
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            {contentState.isLoading ? <Spinner message={contentState.loadingMessage} /> : null}
            <Outlet />
            {SettingsPanelComponent}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  )
}

export default App
