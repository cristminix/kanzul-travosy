import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button, Tabs, Tab, Form } from "react-bootstrap"

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

import shortBeritaSchema from "@/web/data/forms/profile/short/schema.json"
import shortBeritaUiSchema from "@/web/data/forms/profile/short/ui.json"

import beritaSchema from "@/web/data/forms/berita/schema.json"
import beritaUiSchema from "@/web/data/forms/berita/ui.json"

import metaSchema from "@/web/data/forms/pages/schema.json"
import metaUiSchema from "@/web/data/forms/pages/ui.json"

import BeritaList from "./components/BeritaList"
// import MBerita from "@/global/git/models/MBerita"
import MBeritaRw from "@/global/git/orm/rw/models/MBeritaRw"
import HTMLCompiler from "@/global/class/HTMLCompiler"

import MMetaBerita from "@/global/git/models/m-meta/MMetaBerita"
import MBeritaBanner from "@/global/git/models/m-banner/MBeritaBanner"

import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"

import BannerEditor from "./components/BannerEditor"
import { getBlocksReadingTime } from "@/global/fn/getBlocksReadingTime"
import { dateToSqlDateTime } from "@/global/fn/dateToSqlDateTime"
import { createDateFromSqlDateTime } from "@/global/fn/createDateFromSqlDateTime"

import { Plus as IconPlus, RefreshCcw as IconReload, Save as IconSave } from "react-feather"
import { getFileInfo } from "@/global/fn/getFileInfo"
const git = createGit()
// const mBerita = new MBerita(git, beritaSchema)
const mBeritaBanner = new MBeritaBanner(git, bannerSchema)
const mMetaBerita = new MMetaBerita(git, metaSchema)
const mBeritaRw = new MBeritaRw(git)
const compiler = new HTMLCompiler(mBeritaRw)
const pageTitle = "Berita"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Berita", path: "content/berita" },
]

const routePath = "/contents/berita"
import { Send as IconSend } from "react-feather"
const BeritaContentPage = ({ subModule }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage, displayAlert, displayToast } = contentSlice.actions

  const [tabKey, setTabKey] = useState("banner")
  const [trigger, setTrigger] = useState(false)
  // const ckAutoCommitRef=useRef(null)
  // const autoCommitRef= useRef(false)
  const [autoCommit, setAutoCommit] = useState(false)
  const showLoading = (status, message = "Menyimpan Data") => {
    if (status) {
      dispatch(setLoading(true))
      dispatch(setLoadingMessage(message))
    } else {
      dispatch(setLoading(false))
    }
  }
  const showAlert = (type, title, message) => {
    dispatch(displayAlert([type, title, message]))
  }
  const showToast = (type, title, message) => {
    dispatch(displayToast([type, title, message]))
  }
  const onSelectTab = (tabKey) => {
    navigate(`${routePath}/${tabKey}`)
  }

  const [beritaListData, setBeritaListData] = useState([])
  const [beritaFormData, setBeritaFormData] = useState(null)
  const [formBeritaShown, showFormBerita] = useState(false)

  const loadBeritaListData = async () => {
    showLoading(true, "Memuat Berita")
    setBeritaListData([])
    await mBeritaRw.initOrm()
    setTimeout(() => {
      const data = mBeritaRw.getAll()
      setBeritaListData((oData) => [...data])
      showLoading(false)
    }, 256)
  }
  const showEditFormBerita = async (row) => {
    const formData = { ...row }
    formData.cover = await git.getFile64Data(`/assets/images/berita/covers/${formData.cover}`)
    // console.log(formData.cover)
    formData.content = JSON.parse(formData.content)
    formData.readTime = getBlocksReadingTime(formData.content)

    // console.log(formData)
    setBeritaFormData((oFormData) => ({ ...oFormData, ...formData }))
    showFormBerita(true)
  }
  const showAddFormBerita = async (row) => {
    const formData = {}
    // formData.cover = await git.getFile64Data(`/assets/images/berita/covers/${formData.cover}`)
    // console.log(formData.cover)
    formData.content = []
    formData.readTime = 0

    // console.log(formData)
    setBeritaFormData((oFormData) => ({ ...formData }))
    showFormBerita(true)
  }
  const saveCoverImage = async (dataUrl) => {
    let fileInfo
    try {
      fileInfo = getFileInfo(dataUrl, true)
    } catch (e) {
      console.log(`fileTransform error: getFileInfo failed`)
    }
    if (fileInfo) {
      const coverImageGitPath = `assets/images/berita/covers/${fileInfo.name}`
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
  const validHash = async (row) => {
    const checksum = await compiler.getChecksum(row)
    // console.log({
    //   savedHash:row.compiledHash,
    //   checksum
    // })
    return row.compiledHash === checksum
  }
  const reloadBeritaList = () => {
    console.log("reloading berita list")
    setTimeout(() => {
      const button = document.querySelector("button.reload-berita-btn")
      button.click()
    }, 3000)
  }
  const onCompileBerita = async (row) => {
    console.log({ autoCommit })
    showLoading(true, "Sedang Mengkompail")
    let checksum = await compiler.getChecksum(row)

    if (checksum) {
      if (row.compiledHash !== checksum) {
        const result = await compiler.compile(row)
        const targetGitPath = result.targetGitPath
        if (result.checksum && targetGitPath) {
          checksum = result.checksum
          await git.add(targetGitPath)
          await git.commit([targetGitPath])

          const update = await mBeritaRw.getRow(row.id)
          update.compiledHash = checksum
          try {
            await mBeritaRw.update(row.id, update)
            await mBeritaRw.commit(autoCommit)
            showToast("info", "Success", "Compile Success")
          } catch (e) {
            showToast("danger", "Error Compile Failed", e.toString())
          }
        } else {
          showToast("danger", "error", "Compile Failed")
        }
      }
    }
    console.log(checksum)
    showLoading(false)
    // reloadBeritaList()
  }
  const onSaveFormBerita = async (e) => {
    const { formData } = e
    console.log(formData)
    showLoading(true)

    try {
      const fileInfo = await saveCoverImage(formData.cover)
      if (fileInfo) {
        const { name } = fileInfo
        formData.cover = name
      }
      formData.content = JSON.stringify(formData.content)
      formData.dateUpdated = dateToSqlDateTime()

      if (formData.id) {
        // perform update
        const oldRow = await mBeritaRw.getRow(formData.id)
        if (!fileInfo) {
          formData.cover = oldRow.cover
        }
        await mBeritaRw.update(formData.id, formData)
      } else {
        // perform create
        formData.dateCreated = dateToSqlDateTime()
        await mBeritaRw.create(formData)
      }
      await mBeritaRw.commit(autoCommit)
    } catch (e) {
      dispatch(displayAlert(["danger", "error", e.toString()]))
    }

    showLoading(false)
    showFormBerita(false)
    loadBeritaListData()
  }

  const [metaFormData, setMetaFormData] = useState(mMetaBerita.defaultValue)
  const [formMetaShown, showFormMeta] = useState(false)

  const loadMetaData = async () => {
    const data = await mMetaBerita.get()
    // console.log(data)
    setMetaFormData(data)
  }
  const showEditFormMeta = () => {
    // setMetaFormData(row)
    showFormMeta(true)
  }
  const commitRecords = async (e) => {
    showLoading(true, "Saving Records")
    try {
      await git.push()
    } catch (e) {
      dispatch(displayAlert(["danger", "error", e.toString()]))
    }

    showLoading(false)
  }
  const onSaveFormMeta = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mMetaBerita.update(formData)
      await mMetaBerita.commit(autoCommit)
    } catch (e) {
      dispatch(displayAlert(["danger", "error", e.toString()]))
    }

    showLoading(false)
    showFormMeta(false)
    loadMetaData()
  }
  const resetCompiledHash = () => {
    const list = [...beritaListData]
    console.log(list)
    for (const item of list) {
      item.compiledHash = null
    }

    // showLoading(true,"Memuat Produk")
    setBeritaListData([])
    // await mProdukRw.initOrm()
    setTimeout(() => {
      // const data =  mProdukRw.getAll()
      setBeritaListData((oData) => [...list])
      showToast("info", "info", "compile status reseted")
      // showLoading(false)
    }, 256)
  }
  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)

    if (tabName === "berita") {
      loadBeritaListData()
    } else if (tabName === "meta") {
      loadMetaData()
    } else if (tabName === "banner") {
      setTrigger(crc32id())
    }
  }, [location.key, setTabKey, setBeritaFormData, setMetaFormData])
  // useEffect(()=>{
  //   if(ckAutoCommitRef.current)
  //   ckAutoCommitRef.current.checked = autoCommit?true:false
  // },[autoCommit])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      icon={<IconSend />}
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
                    model={mBeritaBanner}
                    trigger={trigger}
                    schema={bannerSchema}
                    uiSchema={bannerUiSchema}
                    showAlert={showAlert}
                  />
                )}
              </Tab>
              <Tab eventKey="berita" title="Berita">
                {tabKey === "berita" && (
                  <>
                    {!formBeritaShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Berita</h4>
                        <div className="twx-p-4 twx-flex twx-justify-between twx-items-center">
                          <Form.Check
                            type="checkbox"
                            label="Auto Commit"
                            onChange={(e) => {
                              setAutoCommit((val) => !val)
                              // autoCommit = ckAutoCommitRef.current.checked
                              // console.log(newAutoCommit)
                              // setAutoCommit(newAutoCommit)
                            }}
                          />
                        </div>
                        <BeritaList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={beritaListData}
                          onEditRow={(row) => showEditFormBerita(row)}
                          onCompileRow={(row) => onCompileBerita(row)}
                          validHash={validHash}
                        />
                        <div className="twx-py-4 twx-flex twx-justify-between">
                          <Button size="sm" className="reload-berita-btn" onClick={(e) => loadBeritaListData()}>
                            <IconReload className="feather-icon twx-mr-1" /> Reload
                          </Button>
                          <Button size="sm" onClick={(e) => resetCompiledHash()}>
                            <IconReload className="feather-icon twx-mr-1" /> Reset Compile
                          </Button>
                          <Button size="sm" onClick={(e) => commitRecords()}>
                            <IconSave className="feather-icon twx-mr-1" /> Commit
                          </Button>
                          <Button size="sm" onClick={(e) => showAddFormBerita()}>
                            <IconPlus className="feather-icon" /> Add
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`${beritaFormData.id ? "Edit" : "Add"} Item Berita`}
                          formData={beritaFormData}
                          schema={beritaSchema}
                          uiSchema={beritaUiSchema}
                          onSubmit={(e) => onSaveFormBerita(e)}
                          onCancel={(e) => showFormBerita(false)}
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

export default BeritaContentPage
