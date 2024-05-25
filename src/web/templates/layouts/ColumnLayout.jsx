import FooterSection from "../sections/FooterSection"
import HeaderSection from "../sections/HeaderSection"
const ColumnLayout = ({ children,footerData, companyData, contactPersonList, socialNetworkLinks,webNavigationList }) => {

    return <>
        <HeaderSection webNavigationList={webNavigationList} companyData={companyData}
            contactPersonList={contactPersonList}
            socialNetworkLinks={socialNetworkLinks}/>
        {children}
        <FooterSection footerData={footerData} companyData={companyData}
            contactPersonList={contactPersonList}
            socialNetworkLinks={socialNetworkLinks} />
    </>
}

export default ColumnLayout