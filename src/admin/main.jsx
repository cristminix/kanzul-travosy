import "@/global/css/tailwind.css"
import Router from "./router"
import { mountApp } from "@/global/fn/mountApp"
// import { RouterProvider } from "react-router-dom"
// mountApp( <RouterProvider router={router} />)
mountApp(<Router />)
