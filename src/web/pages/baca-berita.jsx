

import "@/global/css/tailwind.css"
import BeritaDetailRouter from "../routers/BeritaDetailRouter"
import { mountApp } from "@/global/fn/mountApp"
// import { RouterProvider } from "react-router-dom"
// mountApp( <RouterProvider router={router} />)
mountApp(<BeritaDetailRouter />)