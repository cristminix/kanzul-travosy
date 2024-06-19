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

import shortProdukSchema from "@/web/data/forms/profile/short/schema.json"
import shortProdukUiSchema from "@/web/data/forms/profile/short/ui.json"

import produkSchema from "@/web/data/forms/produk/schema.json"
import produkUiSchema from "@/web/data/forms/produk/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import ProdukList from "./components/ProdukList"
// import MProduk from "@/global/git/models/MProduk"
import MProdukRw from "@/global/git/orm/rw/models/MProdukRw"

import MMetaProduk from "@/global/git/models/m-meta/MMetaProduk"
import MProdukBanner from "@/global/git/models/m-banner/MProdukBanner"


import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"
import {getBlocksReadingTime} from "@/global/fn/getBlocksReadingTime"
import {dateToSqlDateTime} from "@/global/fn/dateToSqlDateTime"
import {createDateFromSqlDateTime} from "@/global/fn/createDateFromSqlDateTime"
import {Plus as IconPlus} from "react-feather"
import {getFileInfo} from "@/global/fn/getFileInfo"
const git = createGit()
// const mProduk = new MProduk(git, produkSchema)
const mProdukBanner = new MProdukBanner(git, bannerSchema)
const mMetaProduk = new MMetaProduk(git, metaSchema)
const mProdukRw = new MProdukRw(git)

const pageTitle = "Konten Produk"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Produk", path: "content/produk" },
] 

const routePath = "/contents/produk"


const ProdukContentPage = ({ subModule }) => {
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

  
  const [produkListData, setProdukListData] = useState([])
  const [produkFormData, setProdukFormData] = useState(null)
  const [formProdukShown, showFormProduk] = useState(false)

  const loadProdukListData = async () => {
    await mProdukRw.initOrm()
    const data =  mProdukRw.getAll()
    setProdukListData(data)
  }
  const showEditFormProduk = async (row) => {
    const formData = {...row}
    formData.cover = await git.getFile64Data(`/assets/images/produk/covers/${formData.cover}`)
    // console.log(formData.cover)
    formData.content = JSON.parse(formData.content)
    formData.readTime = getBlocksReadingTime(formData.content)

    // console.log(formData)  
    setProdukFormData(oFormData=>({...oFormData,...formData}))
    showFormProduk(true)
  }
  const showAddFormProduk = async (row) => {
    const formData = {}
    // formData.cover = await git.getFile64Data(`/assets/images/produk/covers/${formData.cover}`)
    // console.log(formData.cover)
    formData.content = []
    formData.readTime = 0

    // console.log(formData)  
    setProdukFormData(oFormData=>({...formData}))
    showFormProduk(true)
  }
  const saveCoverImage = async(dataUrl)=>{
    let fileInfo
    try {
      fileInfo = getFileInfo(dataUrl, true)
      
    } catch (e) {
      console.log(`fileTransform error: getFileInfo failed`)
    }
    if(fileInfo){
      const coverImageGitPath = `assets/images/produk/covers/${fileInfo.name}`
      const coverImageFsPath = git.basePath(coverImageGitPath)
      
      try {
        await git.fs.writeFileSync(coverImageFsPath, fileInfo.buffer)
        
        await git.add(coverImageGitPath)
        await git.commit([coverImageGitPath])

      } catch (e) {
        console.log(`lfs: cant writeFile ${coverImageGitPath}`, e)
      }  
    }
    return fileInfo
  }
  const onSaveFormProduk = async (e) => {
    const { formData } = e
    console.log(formData)
    showLoading(true)

    try {
      const fileInfo = await saveCoverImage(formData.cover)
      if(fileInfo){
        const {name} = fileInfo
        formData.cover = name
      }
      formData.content = JSON.stringify(formData.content)
      formData.dateUpdated=dateToSqlDateTime()


      if(formData.id){
        // perform update
        const oldRow = await mProdukRw.getRow(formData.id)
        if(!fileInfo){
          formData.cover = oldRow.cover
        }
        await mProdukRw.update(formData.id, formData)
        
      }else{
        // perform create
        formData.dateCreated=dateToSqlDateTime()
        await mProdukRw.create(formData)
      }
      await mProdukRw.commit(true)
      
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showFormProduk(false)
    loadProdukListData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaProduk.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaProduk.get()
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
      await mMetaProduk.update(formData)
      await mMetaProduk.commit(true)
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

    if (tabName === "produk") {
      loadProdukListData()
    } 
     
    else if (tabName === "meta") {
      loadMetaData()
    } else if(tabName === "banner"){
    setTrigger(crc32id())
      
    }
  }, [location.key, setTabKey,setProdukFormData,setMetaFormData])
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
                    model={mProdukBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="produk" title="Produk">
                {tabKey === "produk" && (
                  <>
                    {!formProdukShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Produk</h4>
                        <ProdukList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={produkListData}
                          onEditRow={(row) => showEditFormProduk(row, "utama")}
                        />
                         <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showAddFormProduk()}>
                            <IconPlus className="feather-icon" /> Add
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`${produkFormData.id?'Edit':'Add'} Item Produk`}
                          formData={produkFormData}
                          schema={produkSchema}
                          uiSchema={produkUiSchema}
                          onSubmit={(e) => onSaveFormProduk(e)}
                          onCancel={(e) => showFormProduk(false)}
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

export default ProdukContentPage
