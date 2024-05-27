import "@/global/css/tailwind.css"
import {router} from "./router"
import { mountApp } from "@/global/fn"
import {
  RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// mountApp( <RouterProvider router={router} />)
mountApp(router)