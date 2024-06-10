
import formSchema from "@/web/data/forms/company/schema.json"
import CompanyForm from "./company-content-page/CompanyForm"


import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import CompanyDisplay from "./company-content-page/CompanyDisplay"
import { Button, Tabs, Tab } from "react-bootstrap"

import { createGit } from "@/global/git"
import MCompany from "@/global/git/models/MCompany"
import defaultCompany from "@/web/data/company.json"
import { useLocation } from "react-router-dom"


const git = createGit()
const mCompay = new MCompany(git, formSchema)

const CompanyContentPage = ({}) => {
  const location = useLocation()

  const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions
  
  const [company, setCompany] = useState(mCompay.defaultValue)
  const [formShown,showForm] = useState(false)

  const pageTitle = "Detail Pondok Pesantren"
  const breadcrumbs = [
    { title: "Konten", path: "contents" },
    { title: "Pesantren", path: "content/company" },
  ]
  const [alert, setAlert] = useState(null)
  const hideAlert = () => setAlert(null)
  const createAlert = () => {
    setAlert(
      <SweetAlert
        showCancel
        confirmBtnText="Continue"
        confirmBtnBsStyle="success"
        type="primary"
        title="Are you sure?"
        onCancel={hideAlert}
        onConfirm={hideAlert}>
        You will not be able to recover this imaginary file!
      </SweetAlert>,
    )
  }

  const loadFormData = async () => {
    // await git.cleanup()
    dispatch(setLoading(true))
    // await git.init()
    const companyData = await mCompay.get()
    dispatch(setLoading(false))
    console.log(companyData)
    setCompany(companyData)
  }

  const displayAlertGitNotReady = ()=> setAlert(<SweetAlert
          showCancel
          confirmBtnText="Ya, Unduh sekarang!"
          cancelBtnText ="Nanti saja"
          confirmBtnBsStyle="success"
          type="primary"
          title="Unduh Git Repository ?"
          onCancel={e=>{
            dispatch(setHideGitNotReadyMessage(true ))
            setCompany(defaultCompany)
            hideAlert()
          }}
          onConfirm={async(e)=>{
            hideAlert()
            dispatch(setLoading(true))
            await git.init()
            dispatch(setLoading(false))
            loadFormData()
          }}>
          Database repository Anda masih kosong, Anda perlu mengunduhnya sekarang, 
          proses ini mungkin memerlukan waktu beberapa detik bergantung pada koneksi
          Internet Anda saat ini. 
      </SweetAlert>)
  const showEditForm = ()=>{
    showForm(true)
  }
  const onSaveForm = async(formEvent)=>{
    const {formData} = formEvent
    dispatch(setLoading(true))
    dispatch(setLoadingMessage("Menyimpan Data"))
    await mCompay.update(formData)
    await mCompay.commit(true)
    console.log(formEvent)
    dispatch(setLoading(false))
    showForm(false)
    loadFormData()

  }
  useEffect(() => {
    git.setOnCloneProgressHandler(dispatch, setLoading, setLoadingMessage)
    const performGit = async () => {
      // await git.cleanup()
      // console.log(settingState)
      // await git.cleanup()
      const isCloned = await git.isCloned()
      // console.log(isCloned)
      if (!isCloned) {
        if(!settingState.hideGitNotReadyMessage){
          displayAlertGitNotReady()
          setCompany(defaultCompany)
        }
      }else{
          loadFormData()
        }
    }

    performGit()
  }, [setCompany,location.key])
  
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {alert}
            {formShown?<CompanyForm formData={company} schema={formSchema} onSubmit={e=>onSaveForm(e)} onCancel={e=>showForm(false)}/>:
            <CompanyDisplay company={company} schema={formSchema} />
         }
          </div>
          <div className="card-body twx-flex twx-justify-end">
          {!formShown?
            <Button size="sm" onClick={(e) => showEditForm()}><i className="mdi mdi-pencil-box-outline"/> Ubah</Button>
          :null}
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default CompanyContentPage