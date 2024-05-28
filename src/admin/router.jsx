import { createRoutesFromElements, createHashRouter, Route, RouterProvider } from "react-router-dom"
import AdminApp from "./AdminApp"
import Dashboard from "./pages/Dashboard"
import Company from "./pages/Company"
import Doc from "./pages/Doc"
import Content, { loader as contentLoader } from "@/admin/pages/Content"
export default function Router() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<AdminApp />}
        // loader={rootLoader}
        // action={rootAction}
        // errorElement={<ErrorPage />}
      >
        <Route index element={<Dashboard />} />

        <Route path="/contents" element={<Content />} loader={contentLoader} />
        <Route path="/contents/:module" element={<Content />} loader={contentLoader} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/docs" element={<Doc />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}
