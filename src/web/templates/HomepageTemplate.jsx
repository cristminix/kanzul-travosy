import { useEffect, useState } from "react"
import ColumnLayout from "./layouts/ColumnLayout"
import footerDataDefault from "@/web/data/templates/sections/footer.json"
// import companyDataDefault from "@/web/data/company.json"
import contactPersonListDefault from "@/web/data/contact-person-list.json"
import socialNetworkLinksDefault from "@/web/data/social-network-links.json"
import webNavigationListDefault from "@/web/data/web-navigation-list.json"
import galeryListDefault from "@/web/data/galery-list.json"
import beritaListDefault from "@/web/data/berita-list.json"

import { useDispatch, useSelector } from "react-redux"
import companySlice, { fetchCompany } from "@/global/store/features/companySlice"
import "@/global/css/template.css"
// import LoadingDot from "@/web/components/LoadingDot"
import HomepageMainContent from "./sections/HomepageMainContent"
const HomepageTemplate = ({}) => {
  const [footerData, setFooterData] = useState(footerDataDefault)
  //   const [companyData, setCompanyData] = useState(companyDataDefault)
  const [contactPersonList, setContactPersonList] = useState(contactPersonListDefault)
  const [socialNetworkLinks, setSocialNetworkLinks] = useState(socialNetworkLinksDefault)
  const [webNavigationList, setWebNavigationList] = useState(webNavigationListDefault)
  const [galeryList, setGaleryList] = useState(galeryListDefault)
  const [beritaList, setBeritaList] = useState(beritaListDefault)

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { company } = state
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const data = await fetch("/web/data/footer.json").then((r) => r.json())
        setFooterData(data)
      } catch (e) {
        console.error(e)
      }
    }
    // const loadCompanyData = async () => {
    //   const data = await fetch("/web/data/company.json").then((r) => r.json())
    //   setCompanyData(data)
    // }
    const loadContactPersonList = async () => {
      const data = await fetch("/web/data/contact-person-list.json").then((r) => r.json())
      setContactPersonList(data)
    }
    const loadSocialNetworkLinks = async () => {
      const data = await fetch("/web/data/social-network-links.json").then((r) => r.json())
      setSocialNetworkLinks(data)
    }
    const loadWebNavigationList = async () => {
      const data = await fetch("/web/data/web-navigation-list.json").then((r) => r.json())
      setWebNavigationList(data)
    }
    const loadBeritaList = async () => {
      const data = await fetch("/web/data/berita-list.json").then((r) => r.json())
      setBeritaList(data)
    }
    const loadGaleryList = async () => {
      const data = await fetch("/web/data/galery-list.json").then((r) => r.json())
      setGaleryList(data)
    }
    loadFooterData()
    // loadCompanyData()
    loadContactPersonList()
    loadSocialNetworkLinks()
    loadWebNavigationList()
    loadBeritaList()
    loadGaleryList()
    feather.replace()

    // Replace with dispatch
  }, [])

  useEffect(() => {
    dispatch(fetchCompany())
  }, [dispatch])
  return (
    <ColumnLayout
      webNavigationList={webNavigationList}
      footerData={footerData}
      companyData={company.data}
      contactPersonList={contactPersonList}
      socialNetworkLinks={socialNetworkLinks}>
      <HomepageMainContent galeryList={galeryList} beritaList={beritaList} />
    </ColumnLayout>
  )
}

export default HomepageTemplate
