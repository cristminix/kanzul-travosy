const Navigation = ({webNavigationList})=>{
    // console.log(webNavigationList)
    const cls12 = "cls-12 dropdown inline-block relative pe-1"

		const cls29 = "cls-29 navigation-menu justify-end nav-light"
		const cls33 = "cls-33 sub-menu-item"
    return <div id="navigation"> 
    {/*<!-- Navigation Menu-->*/} 
    <ul className={cls29}> 
    {Array.isArray(webNavigationList)&&webNavigationList.map((item,index)=>{
        let isActive = item.path === '/' ? item.path === location.pathname : location.pathname.startsWith(item.path)
        if(item.path.includes('/index.html')){
        isActive = item.path === '/' ? `${item.path}/index.html` === `${location.pathname}/index.html` : `${location.pathname}/index.html`.startsWith(`${item.path}/index.html`)

        }
        return  <li key={index} className={`${isActive?'active':''}`}> <a href={`${item.path}`} className={`${cls33}`}> {item.title} </a> </li> 
    })}
        {/* <li className={cls30}> 
            <a href="javascript:void(0)"> Hero </a> <span className={cls31}> </span> 
            <ul className={cls32}> 
                <li> <a href="index.html" className={cls33}> Tour One </a> </li> 
                <li> <a href="index-two.html" className={cls33}> Tour Two </a> </li> 
                <li> <a href="index-three.html" className={cls33}> Tour Three </a> </li> 
                <li> <a href="index-four.html" className={cls33}> Tour Four </a> </li> 
                <li> <a href="index-five.html" className={cls33}> Tour Five </a> </li> 
            </ul> 
        </li> 

        <li className={cls34}> <a href="javascript:void(0)">  Listing  </a> <span className={cls31}> </span> 
            <ul className={cls32}> 
                <li className={cls30}> 
                    <a href="javascript:void(0)"> Tour Grid  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="grid.html" className={cls33}> Grid </a> </li> 
                        <li> <a href="grid-left-sidebar.html" className={cls33}> Grid Left Sidebar </a> 
                        </li> 
                        <li> <a href="grid-right-sidebar.html" className={cls33}> Grid Right Sidebar </a> 
                        </li> 
                    </ul> 
                </li> 

                <li className={cls30}> 
                    <a href="javascript:void(0)"> Tour List  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="list.html" className={cls33}> List </a> </li> 
                        <li> <a href="list-left-sidebar.html" className={cls33}> List Left Sidebar </a> 
                        </li> 
                        <li> <a href="list-right-sidebar.html" className={cls33}> List Right Sidebar </a> 
                        </li> 
                    </ul> 
                </li> 

                <li className={cls30}> 
                    <a href="javascript:void(0)">  Tour Detail  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="tour-detail-one.html" className={cls33}> Tour Detail One </a> </li> 
                        <li> <a href="tour-detail-two.html" className={cls33}> Tour Detail Two </a> </li> 
                    </ul> 
                </li> 
            </ul> 
        </li> 

        <li className={cls34}> 
            <a href="javascript:void(0)"> Pages </a> <span className={cls31}> </span> 
            <ul className={cls32}> 
                <li> <a href="aboutus.html" className={cls33}> About Us </a> </li> 

                <li className={cls30}> <a href="javascript:void(0)">  My Account </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="user-profile.html" className={cls33}> User Account </a> </li> 
                        <li> <a href="user-billing.html" className={cls33}> Billing </a> </li> 
                        <li> <a href="user-payment.html" className={cls33}> Payment </a> </li> 
                        <li> <a href="user-invoice.html" className={cls33}> Invoice </a> </li> 
                        <li> <a href="user-social.html" className={cls33}> Social </a> </li> 
                        <li> <a href="user-notification.html" className={cls33}> Notification </a> </li> 
                        <li> <a href="user-setting.html" className={cls33}> Setting </a> </li> 
                    </ul> 
                </li> 

                <li className={cls30}> 
                    <a href="javascript:void(0)">  Helpcenter  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="helpcenter.html" className={cls33}> Overview </a> </li> 
                        <li> <a href="helpcenter-faqs.html" className={cls33}> FAQs </a> </li> 
                        <li> <a href="helpcenter-guides.html" className={cls33}> Guides </a> </li> 
                        <li> <a href="helpcenter-support.html" className={cls33}> Support </a> </li> 
                    </ul> 
                </li> 

                <li className={cls30}> <a href="javascript:void(0)">  Auth Pages  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="login.html" className={cls33}>  Login </a> </li> 
                        <li> <a href="signup.html" className={cls33}>  Signup </a> </li> 
                        <li> <a href="forgot-password.html" className={cls33}>  Forgot Password </a> </li> 
                        <li> <a href="lock-screen.html" className={cls33}>  Lock Screen </a> </li> 
                    </ul> 
                </li> 

                <li className={cls30}> <a href="javascript:void(0)">  Utility  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="terms.html" className={cls33}> Terms of Services </a> </li> 
                        <li> <a href="privacy.html" className={cls33}> Privacy Policy </a> </li> 
                    </ul> 
                </li> 

                <li className={cls30}> <a href="javascript:void(0)">  Special  </a> <span className={cls35}> </span> 
                    <ul className={cls32}> 
                        <li> <a href="comingsoon.html" className={cls33}>  Coming Soon </a> </li> 
                        <li> <a href="maintenance.html" className={cls33}>  Maintenance </a> </li> 
                        <li> <a href="404.html" className={cls33}>  404! </a> </li> 
                    </ul> 
                </li> 
            </ul> 
        </li> 

        <li className={cls30}> 
            <a href="javascript:void(0)"> Blog </a> <span className={cls31}> </span> 
            <ul className={cls32}> 
                <li> <a href="blogs.html" className={cls33}>  Blogs </a> </li> 
                <li> <a href="blog-standard.html" className={cls33}>  Blog Standard </a> </li> 
                <li> <a href="blog-detail.html" className={cls33}>  Blog Detail </a> </li> 
            </ul> 
        </li>  */}

       
    </ul> {/*<!--end navigation menu-->*/} 
    </div>
}

export default Navigation