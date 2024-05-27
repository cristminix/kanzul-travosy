import {
  createRoutesFromElements,
  createBrowserRouter,
  HashRouter,Routes,
  Route,
} from "react-router-dom";
import AdminApp from "./AdminApp"
import Dashboard from "./pages/Dashboard"
import Company from "./pages/Company"
import Doc from "./pages/Doc"
export const router = (<HashRouter>
  <Routes>
    <Route
      path="/"
      element={<AdminApp />}
      // loader={rootLoader}
      // action={rootAction}
      // errorElement={<ErrorPage />}
       >
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/docs" element={<Doc />} />
    </Route>
  </Routes>
</HashRouter>)