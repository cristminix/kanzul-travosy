
  
  <!-- Web Navigation -->

  <ul>

  <li><Link to="/contents/berita">berita</Link></li>
  <li><Link to="/contents/company">company</Link></li>
  <li><Link to="/contents/contact-person">contact-person</Link></li>
  <li><Link to="/contents/galery">galery</Link></li>
  <li><Link to="/contents/search">search</Link></li>
  <li><Link to="/contents/social-network-link">social-network-link</Link></li>
  <li><Link to="/contents/web-navigation">web-navigation</Link></li>
  <li><Link to="/contents/homepage">homepage</Link></li>
  <li><Link to="/contents/welcome-message">welcome-message</Link></li>
  <li><Link to="/contents/footer">footer</Link></li>
</ul>

  
{/* Route */}
import Content,{loader as contentLoader} from "@/admin/pages/Content"
import Berita,{loader as beritaLoader} from "@/admin/pages/contents/Berita"
import Company,{loader as companyLoader} from "@/admin/pages/contents/Company"
import ContactPerson,{loader as contactPersonLoader} from "@/admin/pages/contents/ContactPerson"
import Galery,{loader as galeryLoader} from "@/admin/pages/contents/Galery"
import Search,{loader as searchLoader} from "@/admin/pages/contents/Search"
import SocialNetworkLink,{loader as socialNetworkLinkLoader} from "@/admin/pages/contents/SocialNetworkLink"
import WebNavigation,{loader as webNavigationLoader} from "@/admin/pages/contents/WebNavigation"
import Homepage,{loader as homepageLoader} from "@/admin/pages/contents/Homepage"
import WelcomeMessage,{loader as welcomeMessageLoader} from "@/admin/pages/contents/WelcomeMessage"
import Footer,{loader as footerLoader} from "@/admin/pages/contents/Footer"

<Route path="/contents" element={<Content loader={contentLoader}/>} >  
  
  <Route path="/contents/berita" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/company" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/contact-person" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/galery" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/search" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/social-network-link" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/web-navigation" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/homepage" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/welcome-message" element={<Content loader={contentLoader}/>}/>
  <Route path="/contents/footer" element={<Content loader={contentLoader}/>}/>
</Route>
  