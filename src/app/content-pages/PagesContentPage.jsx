import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import Spinner from "@/app/shared/Spinner"
import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button } from "react-bootstrap"

import { createGit } from "@/global/git"
import { useLocation } from "react-router-dom"


const git = createGit()

// git.cleanup()
/*-------------------EP--------------------------*/
import PageList from "./components/PageList"
import MPages from "@/global/git/models/MPages"

import JsonForm from "./JsonForm"
import pageFormSchema from "@/web/data/forms/pages/schema.json"
import pageFormUiSchema from "@/web/data/forms/pages/ui.json"

const mPages = new MPages(git,pageFormSchema)
/*-------------------EP--------------------------*/

const PagesContentPage = ({}) => {
  const location = useLocation()
  
  const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions
  
  const [formData, setFormData] = useState(mPages.defaultValue)
  const [formShown,showForm] = useState(false)

  const pageTitle = "Edit Meta Halaman"
  const breadcrumbs = [
    { title: "Konten", path: "contents" },
    { title: "Meta Halaman", path: "content/pages" },
  ]
  const [alert, setAlert] = useState(null)
  
  /*-----------------------------------------------------------*/
  const [pages,setPages] = useState([])
  /*-----------------------------------------------------------*/

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

  /*
  not used
  const loadFormData = async () => {
    // await git.cleanup()
    dispatch(setLoading(true))
    // await git.init()
    const companyData = await mCompay.get()
    dispatch(setLoading(false))
    console.log(companyData)
    setCompany(companyData)
  }*/

  const displayAlertGitNotReady = ()=> setAlert(<SweetAlert
          showCancel
          confirmBtnText="Ya, Unduh sekarang!"
          cancelBtnText ="Nanti saja"
          confirmBtnBsStyle="success"
          type="primary"
          title="Unduh Git Repository ?"
          onCancel={e=>{
            dispatch(setHideGitNotReadyMessage(true ))
            // do nothing
            // setCompany(defaultCompany)

            hideAlert()
          }}
          onConfirm={async(e)=>{
            hideAlert()
            dispatch(setLoading(true))
            await git.init()
            dispatch(setLoading(false))
            updateList()
          }}>
          Database repository Anda masih kosong, Anda perlu mengunduhnya sekarang, 
          proses ini mungkin memerlukan waktu beberapa detik bergantung pada koneksi
          Internet Anda saat ini. 
      </SweetAlert>)
 
  const onSaveForm = async(formEvent)=>{
    const {formData} = formEvent
    dispatch(setLoading(true))
    dispatch(setLoadingMessage("Menyimpan Data"))
    
    console.log('implement DBGitFileList.update')
    await mPages.updateRow(formData,true)
    // await mCompay.commit(true)
    
    // console.log(formEvent)
    dispatch(setLoading(false))
    showForm(false)

    console.log('Back to list')
    await updateList()
    // loadFormData()

  }

  const updateList = async()=>{
    const listData = await mPages.getData()
    setPages(oPages=>listData)
    console.log(listData)
  }
  const prepareUpdateList = async()=>{
    git.setOnCloneProgressHandler(dispatch, setLoading, setLoadingMessage)
      const isCloned = await git.isCloned()
      // console.log(isCloned)
      if (!isCloned) {
        if(!settingState.hideGitNotReadyMessage){
          displayAlertGitNotReady()
          // setCompany(defaultCompany)
          console.log('SET DEFAULT LIST DATA')
        }
      }else{
          // loadFormData()
          console.log('SET LIST DATA')
          updateList()
      }
  }

  const showEditForm = (row)=>{
    setFormData(oFormData=>({...oFormData, ...row}))
    showForm(true)
  }
  useEffect(() => { 
    prepareUpdateList()
    console.log(location.key)
  }, [location.key])

  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {alert}
            {formShown?<>
            <JsonForm title={`Edit Page Data for ${formData.name}`} formData={formData} schema={pageFormSchema} uiSchema={pageFormUiSchema} onSubmit={e=>onSaveForm(e)} onCancel={e=>showForm(false)}/>

            </>:
            <>
            <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar Halaman</h4>
            <PageList className="twx-border twx-border-slate-200 twx-border-solid" pages={pages} onEditRow={row=>showEditForm(row)}/>

            {/*<CompanyDisplay company={company} schema={formSchema} />*/}</>
         }
          </div>
          <div className="card-body twx-flex twx-justify-end">
          {!formShown?<>
            DISPLAY BUTTON ON LIST
            {/*<Button size="sm" onClick={(e) => showEditForm()}><i className="mdi mdi-pencil-box-outline"/> Ubah</Button>*/}
          </>:null}
          </div>
        </div>
      </div>
    </MainContentLayout>
  )
}

export default PagesContentPage