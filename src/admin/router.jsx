import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import AdminApp from "./AdminApp"
import Dashboard from "./pages/Dashboard"
import Company from "./pages/Company"
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/admin"
      element={<AdminApp />}
      // loader={rootLoader}
      // action={rootAction}
      // errorElement={<ErrorPage />}
    >
      <Route 
      // errorElement={<ErrorPage />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="company" element={<Company />} />
       {/* <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />*/}
      </Route>
    </Route>
  )
)

