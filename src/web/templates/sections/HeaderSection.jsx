import TagLine from "../blocks/TagLine"
import NavBar from "../blocks/NavBar"
import { useEffect } from 'react';

const HeaderSection = ({companyData, webNavigationList, socialNetworkLinks})=>{
    useEffect(()=>{
        /*********************/
/*   Menu Sticky     */
/*********************/
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if (navbar != null) {
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})
    },[])
    return <>
    <TagLine companyData={companyData} 
            socialNetworkLinks={socialNetworkLinks}/>
    <NavBar webNavigationList={webNavigationList}/>
    </>
}

export default HeaderSection