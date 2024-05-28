import { Link } from "react-router-dom"
const Sidebar = ({}) => {
  return (
    <>
      <div className="twx-border-solid twx-border twx-p-4">
        <ul className="twx-list-none">
          <li>
            <Link to="/dashboard">Dasboard</Link>
          </li>

          <li>
            <Link to="/contents">Konten</Link>
            <ul className="twx-list-none">
              <li>
                <Link to="/contents/berita">berita</Link>
              </li>
              <li>
                <Link to="/contents/company">company</Link>
              </li>
              <li>
                <Link to="/contents/contact-person">contact-person</Link>
              </li>
              <li>
                <Link to="/contents/galery">galery</Link>
              </li>
              <li>
                <Link to="/contents/search">search</Link>
              </li>
              <li>
                <Link to="/contents/social-network-link">social-network-link</Link>
              </li>
              <li>
                <Link to="/contents/web-navigation">web-navigation</Link>
              </li>
              <li>
                <Link to="/contents/homepage">homepage</Link>
              </li>
              <li>
                <Link to="/contents/welcome-message">welcome-message</Link>
              </li>
              <li>
                <Link to="/contents/footer">footer</Link>
              </li>
            </ul>
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
  )
}

export default Sidebar
