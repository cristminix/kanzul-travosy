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

 

import kegiatanSchema from "@/web/data/forms/kegiatan/schema.json"
import kegiatanUiSchema from "@/web/data/forms/kegiatan/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import KegiatanList from "./components/KegiatanList"
import MKegiatan from "@/global/git/models/MKegiatan"

import MMetaKegiatan from "@/global/git/models/m-meta/MMetaKegiatan"
import MKegiatanBanner from "@/global/git/models/m-banner/MKegiatanBanner"


import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"

const git = createGit()
const mKegiatan = new MKegiatan(git, kegiatanSchema)
const mKegiatanBanner = new MKegiatanBanner(git, bannerSchema)
const mMetaKegiatan = new MMetaKegiatan(git, metaSchema)

const pageTitle = "Konten Kegiatan"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Kegiatan", path: "content/kegiatan" },
] 

const routePath = "/contents/kegiatan"


const KegiatanContentPage = ({ subModule }) => {
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
  
  const [kegiatanListData, setKegiatanListData] = useState([])
  const [kegiatanFormData, setKegiatanFormData] = useState(null)
  const [formKegiatanShown, showFormKegiatan] = useState(false)

  const loadKegiatanListData = async () => {
    const data = await mKegiatan.getData()
    setKegiatanListData(data)
  }
  const showEditFormKegiatan = async (row) => {
    // const formData =
    setKegiatanFormData(row)
    showFormKegiatan(true)
  }
  const onSaveFormKegiatan = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mKegiatan.updateRow(formData, true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showFormKegiatan(false)
    loadKegiatanListData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaKegiatan.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaKegiatan.get()
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
      await mMetaKegiatan.update(formData)
      await mMetaKegiatan.commit(true)
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

    if (tabName === "kegiatan") {
      loadKegiatanListData()
    } 
     
    else if (tabName === "meta") {
      loadMetaData()
    } else if(tabName === "banner"){
    setTrigger(crc32id())
      
    }
  }, [location.key, setTabKey,setKegiatanFormData,setMetaFormData])
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
                    model={mKegiatanBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="kegiatan" title="Kegiatan">
                {tabKey === "kegiatan" && (
                  <>
                    {!formKegiatanShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Kegiatan</h4>
                        <KegiatanList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={kegiatanListData}
                          onEditRow={(row) => showEditFormKegiatan(row, "utama")}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Item Kegiatan`}
                          formData={kegiatanFormData}
                          schema={kegiatanSchema}
                          uiSchema={kegiatanUiSchema}
                          onSubmit={(e) => onSaveFormKegiatan(e, "utama")}
                          onCancel={(e) => showFormKegiatan(false)}
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

export default KegiatanContentPage
