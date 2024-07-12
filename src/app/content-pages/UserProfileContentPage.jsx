import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import { useLocation, Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef, useCallback } from "react"
import MainContentLayout from "./MainContentLayout"
// import BlockEditor from "./components/BlockEditor"

const routePath = "/contents/user-profile"
import { getFileInfo } from "@/global/fn/getFileInfo"

// import {getCurrentUserInfo,updateCurrentUserInfo} from "@/global/firebase/user"
import { loadBackend } from "@/global/backend"
import CONFIG from "@/config.json"
const ROUTER_BASE = CONFIG.ROUTER_BASE
const setting = loadBackend(CONFIG)
const authProvider = setting.getProvider()
// import {  } from "../../global/firebase/user"
// import { signOut } from "@/global/firebase/auth"

const { getCurrentUserInfo, updateCurrentUserInfo } = authProvider
import { createGit } from "@/global/git"
import userProfileSchema from "@/web/data/forms/user-profile/schema.json"
import userProfileUiSchema from "@/web/data/forms/user-profile/ui.json"
import { Button, Tabs, Tab } from "react-bootstrap"

import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import { crc32id } from "@/global/fn/crc32id"
const git = createGit()
const pageTitle = "User Profile"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "User Profile", path: "content/user-profile" },
]

const UserProfileContentPage = ({}) => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  // const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage, displayAlert } = contentSlice.actions
  const [formShown, showForm] = useState(false)
  const editorRef = useRef(null)
  const [formData, setFormData] = useState(null)
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
  // const showToast = (type, title, message) => {
  //   dispatch(displayToast([type, title, message]))
  // }
  // const onSelectTab = (tabKey) => {
  //   navigate(`${routePath}/${tabKey}`)
  // }

  const saveAvatarImage = async (dataUrl) => {
    let fileInfo
    try {
      fileInfo = getFileInfo(dataUrl, true)
    } catch (e) {
      console.log(`fileTransform error: getFileInfo failed`)
    }
    if (fileInfo) {
      const coverImageGitPath = `assets/images/faces/${fileInfo.name}`
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

  const loadCurrentUser = async () => {
    let data = await getCurrentUserInfo()
    try {
      data.originalAvatarUrl = data.avatarUrl
      const fileData = await git.getFile64Data(`/${data.avatarUrl}`)
      // console.log(fileData)
      data.avatarUrl = fileData
    } catch (e) {
      showAlert("danger", "error", e.toString())
    }
    setFormData(data)
  }

  const onSaveForm = async (e) => {
    const frmData = e.formData

    showLoading(true)
    // showLoading(false)

    try {
      const fileInfo = await saveAvatarImage(frmData.avatarUrl)

      if (fileInfo) {
        const { name } = fileInfo
        frmData.avatarUrl = `assets/images/faces/${name}`
      }

      await updateCurrentUserInfo(frmData)
      await git.push()
      // await mProdukRw.commit(autoCommitRef.current)
    } catch (e) {
      dispatch(displayAlert(["danger", "error", e.toString()]))
    }

    showLoading(false)
    showForm(false)
    loadCurrentUser()
  }
  useEffect(() => {
    loadCurrentUser()
    // setTimeout(()=>loadBeritaList(),1000)
  }, [setFormData])

  useEffect(() => {})
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className=" twx-p-8">
              {!formShown ? (
                <>
                  <RowDataDisplay
                    title="Short Profile Details"
                    showImages={["avatarUrl"]}
                    rowData={formData}
                    schema={userProfileSchema}
                  />
                  <div className="twx-py-4 twx-flex twx-justify-end">
                    <Button size="sm" onClick={(e) => showForm(true)}>
                      <i className="mdi mdi-pencil-box-outline" /> Ubah
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <JsonForm
                    title={`Edit ShortProfile Details`}
                    formData={formData}
                    schema={userProfileSchema}
                    uiSchema={userProfileUiSchema}
                    onSubmit={(e) => onSaveForm(e)}
                    onCancel={(e) => showForm(false)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default UserProfileContentPage
