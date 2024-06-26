import { useLocation } from "react-router-dom"
import { Navigate, Outlet } from "react-router-dom"
import App from "./App"
const PrivateRoutes = ({ isLoading, isAuthed, isLogedIn }) => {
  const location = useLocation()
  // console.log(location.pathname)
  let auth = { token: true }
  if (isLoading) return "Loading ..."
  return isLogedIn || location.pathname === "/login" ? <App isLogedIn={isLogedIn} /> : <Navigate to="/login" />
}

export default PrivateRoutes
