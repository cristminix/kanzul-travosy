import TagLine from "../blocks/TagLine"
import NavBar from "../blocks/NavBar"
const HeaderSection = ({companyData, webNavigationList, socialNetworkLinks})=>{
    return <>
    <TagLine companyData={companyData} 
            socialNetworkLinks={socialNetworkLinks}/>
    <NavBar webNavigationList={webNavigationList}/>
    </>
}

export default HeaderSection