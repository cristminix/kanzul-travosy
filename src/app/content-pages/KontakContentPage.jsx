import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"
import bannerSchema from "@/web/data/forms/banner/schema.json"
import bannerUiSchema from "@/web/data/forms/banner/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button, Tabs, Tab } from "react-bootstrap"

import { createGit } from "@/global/git"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { ROUTER_BASE } from "@/config.json"

// form related
import companySchema from "@/web/data/forms/company/schema.json"
import companyUiSchema from "@/web/data/forms/company/ui.json"

import contactPersonSchema from "@/web/data/forms/contact-person/schema.json"
import contactPersonUiSchema from "@/web/data/forms/contact-person/ui.json"



import MMetaKontak from "@/global/git/models/m-meta/MMetaKontak"
import MKontakBanner from "@/global/git/models/m-banner/MKontakBanner"

import MCompany from "@/global/git/models/MCompany"
import MContactPerson from "@/global/git/models/MContactPerson"
import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import ContactPersonList from "./components/ContactPersonList"
import BannerEditor from './components/BannerEditor';

import socialNetworkLinkSchema from "@/web/data/forms/social-network-link/schema.json"
import socialNetworkLinkUiSchema from "@/web/data/forms/social-network-link/ui.json"
import MSocialNetworkLink from "@/global/git/models/MSocialNetworkLink"

const git = createGit()
const mCompany = new MCompany(git, companySchema)
const mContactPeron = new MContactPerson(git, contactPersonSchema)
const mKontakBanner = new MKontakBanner(git, bannerSchema)
const mMetaKontak = new MMetaKontak(git, metaSchema)
const mSocialNetworkLink = new MSocialNetworkLink(git, socialNetworkLinkSchema)

const pageTitle = "Konten Company"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Kontak", path: "content/contact" },
] 

const routePath = "/contents/kontak"


const KontakContentPage = ({ subModule }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage,displayAlert } = contentSlice.actions

  const [tabKey, setTabKey] = useState("banner")
  const [trigger, setTrigger] = useState(false)

  const showLoading = (status, message = "Menyimpan Data") => {
    if (status) {
      dispatch(setLoading(true))
      dispatch(setLoadingMessage(message))
    } else {
      dispatch(setLoading(false))
    }
  }
  const showAlert = (type,title,message)=>{
      dispatch(displayAlert(["danger","error",e.toString()]))
  }
  const onSelectTab = (tabKey) => {
    navigate(`${routePath}/${tabKey}`)
  }

  const [contactPersonListData, setContactPersonListData] = useState([])
  const [contactPersonFormData, setContactPersonFormData] = useState(mContactPeron.defaultValue)
  const [contactPersonFormShown, showContactPersonForm] = useState(false)
  
  const loadContactPersonListData = async () => {
    const data = await mContactPeron.getData()
    setContactPersonListData(data)
  }
  const showContactPersonEditForm = (row, type) => {
    setContactPersonFormData(row)
    showContactPersonForm(true)
  }

  const onSaveContactPersonForm = async (e, type) => {
    const { formData } = e
    showLoading(true)
    try {
      await mContactPeron.updateRow(formData, true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showContactPersonForm(false)
    loadContactPersonListData()
  }

  const [companyFormData, setCompanyFormData] = useState(mCompany.defaultValue)
  const [companyFormShown, showCompanyForm] = useState(false)

  const loadCompanyData = async () => {
    const data = await mCompany.get()
    setCompanyFormData(data)
  }
  const showCompanyEditForm = () => {
    showCompanyForm(true)
  }
  const onSaveCompanyForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mCompany.update(formData)
      await mCompany.commit(true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))
    }

    showLoading(false)
    showCompanyForm(false)
    loadCompanyData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaKontak.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaKontak.get()
    // console.log(data)
    setMetaFormData(data)
  }
  const showEditFormMeta = () => {
    // setMetaFormData(row)
    showFormMeta(true)
  }
  const onSaveFormMeta = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mMetaKontak.update(formData)
      await mMetaKontak.commit(true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))
    }

    showLoading(false)
    showFormMeta(false)
    loadMetaData()
  }

  const [socialNetworkLinkFormShown, showSocialNetworkLinkForm] = useState(false)
  const [socialNetworkLinkFormData, setSocialNetworkLinkFormData] = useState(MSocialNetworkLink.defaultValue)
  const loadSocialNetworkLinkData = async () => {
    const data = await mSocialNetworkLink.get()
    console.log(data)
    setSocialNetworkLinkFormData(data)
  }
  const showEditSocialNetworkLinkForm = () => {
    showSocialNetworkLinkForm(true)
  }
  const onSaveSocialNetworkLinkForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mSocialNetworkLink.update(formData)
      await mSocialNetworkLink.commit(true)
    } catch (e) {
      showAlert("danger", "error", e.toString())
    }
    showSocialNetworkLinkForm(false)
    showLoading(false)
    loadSocialNetworkLinkData()
  }

  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)
    // setTrigger(crc32id())

    if (tabName === "company") {
      loadCompanyData()
    } 
    else if (tabName === "contact-person") {
      loadContactPersonListData()
    } 
    else if (tabName === "social-network-link") {
      loadSocialNetworkLinkData()
    } 
  }, [location.key, setTabKey,setCompanyFormData,setContactPersonListData,setSocialNetworkLinkFormData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <Tabs id="content-contact-tab" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
              <Tab eventKey="banner" title="Banner">
                {tabKey === "banner" && (
                  <BannerEditor
                    showLoading={showLoading}
                    page="profile"
                    model={mKontakBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="company" title="Company">
                {tabKey === "company" && (
                  <>
                    {!companyFormShown ? (
                      <>
                        <RowDataDisplay title="Company Details" rowData={companyFormData} schema={companySchema}/>
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showCompanyEditForm(true)}>
                            <i className="mdi mdi-pencil-box-outline" /> Ubah
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Company Details`}
                          formData={companyFormData}
                          schema={companySchema}
                          uiSchema={companyUiSchema}
                          onSubmit={(e) => onSaveCompanyForm(e)}
                          onCancel={(e) => showCompanyForm(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              <Tab eventKey="contact-person" title="Contact Person">
                {tabKey === "contact-person" && (
                  <>
                    {!contactPersonFormShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Contact Person</h4>
                        <ContactPersonList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={contactPersonListData}
                          onEditRow={(row) => showContactPersonEditForm(row)}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Contact Person`}
                          formData={contactPersonFormData}
                          schema={contactPersonSchema}
                          uiSchema={contactPersonUiSchema}
                          onSubmit={(e) => onSaveContactPersonForm(e)}
                          onCancel={(e) => showContactPersonForm(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              
              <Tab eventKey="social-network-link" title="Social Network Link">
{tabKey === "social-network-link" && (
    <>
    {socialNetworkLinkFormShown ? (
        <>
        <JsonForm
            schema={socialNetworkLinkSchema}
            uiSchema={socialNetworkLinkUiSchema}
            title="Edit SocialNetworkLink Data"
            formData={socialNetworkLinkFormData}
            onCancel={(e) => showSocialNetworkLinkForm(false)}
            onSubmit={(e) => onSaveSocialNetworkLinkForm(e)}
        />
        </>
    ) : (
        <>
        <RowDataDisplay schema={socialNetworkLinkSchema} rowData={socialNetworkLinkFormData} title="Social Network Link Data" />
        <div className="twx-py-4 twx-flex twx-justify-end">
            <Button size="sm" onClick={(e) => showEditSocialNetworkLinkForm(true)}>
            <i className="mdi mdi-pencil-box-outline" /> Ubah
            </Button>
        </div>
        </>
    )}
    </>
)}
</Tab>

            </Tabs>
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default KontakContentPage
