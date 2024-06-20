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

import shortLembagaSchema from "@/web/data/forms/profile/short/schema.json"
import shortLembagaUiSchema from "@/web/data/forms/profile/short/ui.json"

import lembagaSchema from "@/web/data/forms/lembaga/schema.json"
import lembagaUiSchema from "@/web/data/forms/lembaga/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import LembagaList from "./components/LembagaList"
import MLembaga from "@/global/git/models/MLembaga"

import MMetaLembaga from "@/global/git/models/m-meta/MMetaLembaga"
import MLembagaBanner from "@/global/git/models/m-banner/MLembagaBanner"


import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"

const git = createGit()
const mLembaga = new MLembaga(git, lembagaSchema)
const mLembagaBanner = new MLembagaBanner(git, bannerSchema)
const mMetaLembaga = new MMetaLembaga(git, metaSchema)

const pageTitle = "Konten Lembaga"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Lembaga", path: "content/lembaga" },
] 

const routePath = "/contents/lembaga"


const LembagaContentPage = ({ subModule }) => {
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
      dispatch(displayAlert([type,title,message]))

  }

  const onSelectTab = (tabKey) => {
    navigate(`${routePath}/${tabKey}`)
  }

  
  const [lembagaListData, setLembagaListData] = useState([])
  const [lembagaFormData, setLembagaFormData] = useState(null)
  const [formLembagaShown, showFormLembaga] = useState(false)

  const loadLembagaListData = async () => {
    const data = await mLembaga.getData()
    setLembagaListData(data)
  }
  const showEditFormLembaga = async (row) => {
    // const formData =
    setLembagaFormData(row)
    showFormLembaga(true)
  }
  const onSaveFormLembaga = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mLembaga.updateRow(formData, true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showFormLembaga(false)
    loadLembagaListData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaLembaga.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaLembaga.get()
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
      await mMetaLembaga.update(formData)
      await mMetaLembaga.commit(true)
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

    if (tabName === "lembaga") {
      loadLembagaListData()
    } 
     
    else if (tabName === "meta") {
      loadMetaData()
    } else if(tabName === "banner"){
    setTrigger(crc32id())
      
    }
  }, [location.key, setTabKey,setLembagaFormData,setMetaFormData])
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
                    model={mLembagaBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="lembaga" title="Lembaga">
                {tabKey === "lembaga" && (
                  <>
                    {!formLembagaShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Lembaga</h4>
                        <LembagaList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={lembagaListData}
                          onEditRow={(row) => showEditFormLembaga(row, "utama")}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Item Lembaga`}
                          formData={lembagaFormData}
                          schema={lembagaSchema}
                          uiSchema={lembagaUiSchema}
                          onSubmit={(e) => onSaveFormLembaga(e, "utama")}
                          onCancel={(e) => showFormLembaga(false)}
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

export default LembagaContentPage
