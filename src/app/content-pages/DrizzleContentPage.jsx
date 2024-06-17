import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import { useLocation, Link, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef, useCallback } from "react"
import MainContentLayout from "./MainContentLayout"
import BlockEditor from "./components/BlockEditor"

const pageTitle = "Drizzle Admin"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Drizzle", path: "content/drizzle" },
]

const routePath = "/contents/block-editor"


import { createGit } from "@/global/git"
import MBeritaRw from "@/global/git/orm/rw/models/MBeritaRw"

const git = createGit()
const mBeritaRw = new MBeritaRw(git)
console.log(mBeritaRw)
const DrizzleContentPage = ({}) => {
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

  

  const loadBeritaList = async () => {
    await mBeritaRw.initOrm()
    const data = mBeritaRw.getAll()
    console.log(data)
    // const {time,version,blocks} = data
    // const editorBlock = {time,version,blocks}

    // setEditorBlockData(oData=>({...oData,...editorBlock}))
  }
  const onSave = async(output)=>{
  	console.log(output)
  }
  useEffect(() => {
    setTimeout(()=>loadBeritaList(),1000)

  }, [setEditorBlockData])

  useEffect(()=>{

  })
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default DrizzleContentPage
