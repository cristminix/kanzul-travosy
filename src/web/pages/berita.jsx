

import "@/global/css/tailwind.css"
import BeritaRouter from "../routers/BeritaRouter"
import { mountApp } from "@/global/fn/mountApp"
// import { RouterProvider } from "react-router-dom"
// mountApp( <RouterProvider router={router} />)
mountApp(<BeritaRouter />)