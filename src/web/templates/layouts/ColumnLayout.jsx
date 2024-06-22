import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react"
import companySlice, { fetchCompany } from "@/global/store/features/companySlice"
import contactPersonSlice, { fetchContactPerson } from "@/global/store/features/contactPersonSlice"
import footerSlice, { fetchFooter } from "@/global/store/features/footerSlice"
import socialNetworkLinkSlice, { fetchSocialNetworkLink } from "@/global/store/features/socialNetworkLinkSlice"
import webNavigationSlice, { fetchWebNavigation } from "@/global/store/features/webNavigationSlice"

import FooterSection from "../sections/FooterSection"
import HeaderSection from "../sections/HeaderSection"
import "@/global/css/template.css"
import settingSlice  from '@/global/store/features/settingSlice';
import { crc32id } from '../../../global/fn/crc32id';

const ColumnLayout = ({
  children,
  // footerData,
  // companyData,
  // contactPersonList,
  // socialNetworkLinks,
  // webNavigationList,
}) => {
  const dispatch = useDispatch()
  const companyState = useSelector((state) => state.company)
  const footerState = useSelector((state) => state.footer)
  const contactPersonState = useSelector((state) => state.contactPerson)
  const socialNetworkLinkState = useSelector((state) => state.socialNetworkLink)
  const webNavigationState = useSelector((state) => state.webNavigation)
  const {updateClientId} = settingSlice.actions
  useEffect(() => {
    dispatch(updateClientId())
    dispatch(fetchCompany())
    dispatch(fetchWebNavigation())
    dispatch(fetchSocialNetworkLink())
    dispatch(fetchFooter())
    dispatch(fetchContactPerson())
  }, [])

  return (
    <>
      <HeaderSection
        webNavigationList={webNavigationState.data}
        companyData={companyState.data}
        contactPersonList={contactPersonState.data}
        socialNetworkLinks={socialNetworkLinkState.data}
      />
      {children}
      <FooterSection
        footerData={footerState.data}
        companyData={companyState.data}
        contactPersonList={contactPersonState.data}
        socialNetworkLinks={socialNetworkLinkState.data}
      />
    </>
  )
}

export default ColumnLayout