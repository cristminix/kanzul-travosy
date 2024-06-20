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

import shortGalerySchema from "@/web/data/forms/profile/short/schema.json"
import shortGaleryUiSchema from "@/web/data/forms/profile/short/ui.json"

import galerySchema from "@/web/data/forms/galery/schema.json"
import galeryUiSchema from "@/web/data/forms/galery/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import GaleryList from "./components/GaleryList"
import MGalery from "@/global/git/models/MGalery"

import MMetaGalery from "@/global/git/models/m-meta/MMetaGalery"
import MGaleryBanner from "@/global/git/models/m-banner/MGaleryBanner"


import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"

const git = createGit()
const mGalery = new MGalery(git, galerySchema)
const mGaleryBanner = new MGaleryBanner(git, bannerSchema)
const mMetaGalery = new MMetaGalery(git, metaSchema)

const pageTitle = "Konten Galery"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Galery", path: "content/galery" },
] 

const routePath = "/contents/galery"


const GaleryContentPage = ({ subModule }) => {
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
  const showAlert = (type,title,message)=>{
     dispatch(displayAlert([type,title,message]))

  }
  
  const [galeryListData, setGaleryListData] = useState([])
  const [galeryFormData, setGaleryFormData] = useState(null)
  const [formGaleryShown, showFormGalery] = useState(false)

  const loadGaleryListData = async () => {
    const data = await mGalery.getData()
    setGaleryListData(data)
  }
  const showEditFormGalery = async (row) => {
    // const formData =
    setGaleryFormData(row)
    showFormGalery(true)
  }
  const onSaveFormGalery = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mGalery.updateRow(formData, true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showFormGalery(false)
    loadGaleryListData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaGalery.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaGalery.get()
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
      await mMetaGalery.update(formData)
      await mMetaGalery.commit(true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))
    }

    showLoading(false)
    showFormMeta(false)
    loadMetaData()
  }

  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)

    if (tabName === "galery") {
      loadGaleryListData()
    } 
     
    else if (tabName === "meta") {
      loadMetaData()
    } else if(tabName === "banner"){
    setTrigger(crc32id())
      
    }
  }, [location.key, setTabKey,setGaleryFormData,setMetaFormData])
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
                    model={mGaleryBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="galery" title="Galery">
                {tabKey === "galery" && (
                  <>
                    {!formGaleryShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Galery</h4>
                        <GaleryList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={galeryListData}
                          onEditRow={(row) => showEditFormGalery(row, "utama")}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Item Galery`}
                          formData={galeryFormData}
                          schema={galerySchema}
                          uiSchema={galeryUiSchema}
                          onSubmit={(e) => onSaveFormGalery(e)}
                          onCancel={(e) => showFormGalery(false)}
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

export default GaleryContentPage
