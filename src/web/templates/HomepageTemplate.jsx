import { useEffect } from "react"
import ColumnLayout from "./layouts/ColumnLayout"
import footerData from "@/web/data/templates/sections/footer.json"
import companyData from "@/web/data/company.json"
import contactPersonList from "@/web/data/contact-person-list.json"
import socialNetworkLinks from "@/web/data/social-network-links.json"
import webNavigationList from  "@/web/data/web-navigation-list.json"
import "@/global/css/template.css"

import HomepageMainContent from "./sections/HomepageMainContent"
const HomepageTemplate = ({})=>{
    useEffect(()=>{
        feather.replace()
    },[])
    return <ColumnLayout webNavigationList={webNavigationList}
    footerData={footerData} 
    companyData={companyData} 
    contactPersonList={contactPersonList} 
    socialNetworkLinks={socialNetworkLinks}>
    <HomepageMainContent/>
    </ColumnLayout>
}

export default HomepageTemplate