import { useEffect,useState } from "react"
import ColumnLayout from "./layouts/ColumnLayout"
import footerDataDefault from "@/web/data/templates/sections/footer.json"
import companyDataDefault from "@/web/data/company.json"
import contactPersonListDefault from "@/web/data/contact-person-list.json"
import socialNetworkLinksDefault from "@/web/data/social-network-links.json"
import webNavigationListDefault from  "@/web/data/web-navigation-list.json"
import galeryListDefault from  "@/web/data/galery-list.json"
import beritaListDefault from  "@/web/data/berita-list.json"

import "@/global/css/template.css"

import HomepageMainContent from "./sections/HomepageMainContent"
const HomepageTemplate = ({})=>{

    const [footerData,setFooterData]=useState(footerDataDefault)
    const [companyData,setCompanyData]=useState(companyDataDefault)
    const [contactPersonList,setContactPersonList]=useState(contactPersonListDefault)
    const [socialNetworkLinks,setSocialNetworkLinks]=useState(socialNetworkLinksDefault)
    const [webNavigationList,setWebNavigationList]=useState(webNavigationListDefault)
    const [galeryList,setGaleryList]=useState(galeryListDefault)
    const [beritaList,setBeritaList]=useState(beritaListDefault)
    useEffect(()=>{
        feather.replace()
    },[])
    return <ColumnLayout webNavigationList={webNavigationList}
    footerData={footerData} 
    companyData={companyData} 
    contactPersonList={contactPersonList} 
    socialNetworkLinks={socialNetworkLinks}>
    <HomepageMainContent galeryList={galeryList} beritaList={beritaList}/>
    </ColumnLayout>
}

export default HomepageTemplate