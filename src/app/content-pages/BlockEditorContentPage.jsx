import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import { useLocation, Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef, useCallback } from "react"
import MainContentLayout from "./MainContentLayout"
import { EDITOR_JS_TOOLS } from "./components/editor-js-tools"
const pageTitle = "Konten Block Editor"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Block Editor", path: "content/block-editor" },
]

const routePath = "/contents/block-editor"

import { createReactEditorJS } from "react-editor-js"
import { Button } from "react-bootstrap"
import { 
	Save as IconSave ,
	RefreshCw as IconRefresh
} from "react-feather"
import { createGit } from "@/global/git"
import MProfileBlock from "@/global/git/models/m-block/MProfileBlock"

const ReactEditorJS = createReactEditorJS()
const git = createGit()
const mProfileBlock = new MProfileBlock(git)

const BlockEditorContentPage = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage, displayAlert } = contentSlice.actions

  const editorRef = useRef(null)
  const [editorBlockData,setEditorBlockData]= useState({blocks:[]})
  const showLoading = (status, message = "Menyimpan Data") => {
    if (status) {
      dispatch(setLoading(true))
      dispatch(setLoadingMessage(message))
    } else {
      dispatch(setLoading(false))
    }
  }

  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    showLoading(true)
    const savedData = await editorRef.current.save()
    console.log(savedData)
    // await mProfileBlock.update('full',savedData)
  	showLoading(false)
  }, [])

  const loadProfileBlock = async () => {
    const data = await mProfileBlock.getRow('full')
    const {time,version,blocks} = data
    const editorBlock = {time,version,blocks}
    console.log(editorBlock)

    setEditorBlockData(oData=>({...oData,...editorBlock}))
  }

  useEffect(() => {
  	setTimeout(()=>{
    	loadProfileBlock()
  	},1000)
  }, [setEditorBlockData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="twx-p-4 twx-text-2xl">Editor</h4>
            <div className="twx-flex twx-justify-between twx-p-2 twx-gap-2">
              <Button size="sm" onClick={(e) => loadProfileBlock()}>
                <IconRefresh className="feather-icon" />
                Load
              </Button>
              <Button size="sm" onClick={(e) => handleSave()}>
                <IconSave className="feather-icon" />
                Simpan
              </Button>
            </div>
            <div className="twx-border twx-border-gray-300">
              <ReactEditorJS onInitialize={handleInitialize} value={editorBlockData} tools={EDITOR_JS_TOOLS} />
            </div>
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default BlockEditorContentPage
