import "@/global/css/tailwind.css"
import {router} from "./router"
import { mountApp } from "@/global/fn"
import {
  RouterProvider,
} from "react-router-dom";

mountApp( <RouterProvider router={router} />)