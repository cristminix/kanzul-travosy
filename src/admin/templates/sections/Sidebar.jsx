
import {Link} from "react-router-dom"
const Sidebar = ({})=>{
	return <>
	 <div className="twx-border-solid twx-border twx-p-4">
      <ul className="twx-list-none">
        <li>
          	<Link to="/dashboard">Dasboard</Link>
          </li>
          <li>
          	<Link to="/company">Company</Link>
          </li>
          <li>
          	<Link to="/contents">Konten</Link>
          </li>
          <li>
          	<Link to="/settings">Setting</Link>
          </li>
          <li>
          	<Link to="/docs">Docs</Link>
          </li>
          <li>
          	<Link to="/login">Login</Link>
          </li>
          <li>
          	<Link to="/logout">Logout</Link>
          </li>
          <li>
          	<Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
	</>
}

export default Sidebar