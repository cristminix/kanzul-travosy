import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"


import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button, Tabs, Tab } from "react-bootstrap"

import { createGit } from "@/global/git"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { ROUTER_BASE } from "@/config.json"

// form related
import bannerSchema from "@/web/data/forms/banner/schema.json"
import bannerUiSchema from "@/web/data/forms/banner/ui.json"

import companySchema from "@/web/data/forms/company/schema.json"
import companyUiSchema from "@/web/data/forms/company/ui.json"

import contactPersonSchema from "@/web/data/forms/contact-person/schema.json"
import contactPersonUiSchema from "@/web/data/forms/contact-person/ui.json"

import shortProfileSchema from "@/web/data/forms/profile/short/schema.json"
import shortProfileUiSchema from "@/web/data/forms/profile/short/ui.json"

import fullProfileSchema from "@/web/data/forms/profile/full/schema.json"
import fullProfileUiSchema from "@/web/data/forms/profile/full/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import {MFullProfile, MShortProfile} from "@/global/git/models/MProfile"
import MMetaProfile from "@/global/git/models/m-meta/MMetaProfile"
import MProfileBanner from "@/global/git/models/m-banner/MProfileBanner"


import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"

const git = createGit()
const mShortProfile = new MShortProfile(git, shortProfileSchema)
const mFullProfile = new MFullProfile(git, fullProfileSchema)
const mProfileBanner = new MProfileBanner(git, bannerSchema)
const mMetaProfile = new MMetaProfile(git, metaSchema)
const pageTitle = "Konten Profile"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Profile", path: "content/profile" },
] 

const routePath = "/contents/profile"


const ProfileContentPage = ({ subModule }) => {
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
  const onSelectTab = (tabKey) => {
    navigate(`${routePath}/${tabKey}`)
  }

  
  const [shortProfileFormData, setShortProfileFormData] = useState(mShortProfile.defaultValue)
  const [shortProfileFormShown, showShortProfileForm] = useState(false)

  const showAlert = (type,title,message)=>{
      dispatch(displayAlert(["danger","error",e.toString()]))
  }

  const loadShortProfileData = async () => {
    const data = await mShortProfile.get()
    setShortProfileFormData(data)
  }
  const showShortProfileEditForm = () => {
    showShortProfileForm(true)
  }
  const onSaveShortProfileForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mShortProfile.update(formData)
      await mShortProfile.commit(true)
    } catch (e) {
     showAlert("danger","error",e.toString())
    }

    showLoading(false)
    showShortProfileForm(false)
    loadShortProfileData()
  }

  const [fullProfileFormData, setFullProfileFormData] = useState(mFullProfile.defaultValue)
  const [fullProfileFormShown, showFullProfileForm] = useState(false)

  const loadFullProfileData = async () => {
    const data = await mFullProfile.get()
    setFullProfileFormData(data)
  }
  const showFullProfileEditForm = () => {
    showFullProfileForm(true)
  }
  const onSaveFullProfileForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mFullProfile.update(formData)
      await mFullProfile.commit(true)
    } catch (e) {
      showAlert("danger","error",e.toString())
    }

    showLoading(false)
    showFullProfileForm(false)
    loadFullProfileData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaProfile.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaProfile.get()
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
      await mMetaProfile.update(formData)
      await mMetaProfile.commit(true)
    } catch (e) {
      showAlert("danger","error",e.toString())
    }

    showLoading(false)
    showFormMeta(false)
    loadMetaData()
  }

  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)

    if (tabName === "short-profile") {
      loadShortProfileData()
    } 
    else if (tabName === "full-profile") {
      loadFullProfileData()
    } 
    else if (tabName === "contact-person") {
      loadContactPersonListData()
    } 
    else if (tabName === "meta") {
      loadMetaData()
    } else if(tabName === "banner"){
    setTrigger(crc32id())
      
    }
  }, [location.key, setTabKey,setShortProfileFormData,setFullProfileFormData,setMetaFormData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <Tabs id="content-profile-tab" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
            <Tab eventKey="banner" title="Banner">
                {tabKey === "banner" && (
                  <BannerEditor
                    showLoading={showLoading}
                    page="profile"
                    model={mProfileBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="short-profile" title="Short Profile">
                {tabKey === "short-profile" && (
                  <>
                    {!shortProfileFormShown ? (
                      <>
                        <RowDataDisplay title="Short Profile Details" 
                        showImages={['image']}
                        rowData={shortProfileFormData} 
                        schema={shortProfileSchema}/>
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showShortProfileEditForm(true)}>
                            <i className="mdi mdi-pencil-box-outline" /> Ubah
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit ShortProfile Details`}
                          formData={shortProfileFormData}
                          schema={shortProfileSchema}
                          uiSchema={shortProfileUiSchema}
                          onSubmit={(e) => onSaveShortProfileForm(e)}
                          onCancel={(e) => showShortProfileForm(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              <Tab eventKey="full-profile" title="Full Profile">
                {tabKey === "full-profile" && (
                  <>
                    {!fullProfileFormShown ? (
                      <>
                          
                        <RowDataDisplay title="Full Profile Details" 
                        showImages={['image']} rowData={fullProfileFormData} schema={fullProfileSchema}/>
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showFullProfileEditForm(true)}>
                            <i className="mdi mdi-pencil-box-outline" /> Ubah
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Full Profile Details`}
                          formData={fullProfileFormData}
                          schema={fullProfileSchema}
                          uiSchema={fullProfileUiSchema}
                          onSubmit={(e) => onSaveFullProfileForm(e)}
                          onCancel={(e) => showFullProfileForm(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              <Tab eventKey="meta" title="Meta">
                {tabKey === "meta" && (
                  <>
                    {formMetaShown ? (
                      <>
                        <JsonForm
                          title="Edit Meta Page"
                          formData={metaFormData}
                          schema={metaSchema}
                          uiSchema={metaUiSchema}
                          onSubmit={(e) => onSaveFormMeta(e)}
                          onCancel={(e) => showFormMeta(false)}
                        />
                      </>
                    ) : (
                      <>
                        <RowDataDisplay title="Meta Page" schema={metaSchema} rowData={metaFormData} />
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showEditFormMeta()}>
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

export default ProfileContentPage
