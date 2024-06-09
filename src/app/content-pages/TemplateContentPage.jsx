import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button, Tabs, Tab } from "react-bootstrap"

import { createGit } from "@/global/git"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { ROUTER_BASE } from "@/config.json"

// Form Schema Related
import footerSchema from "@/web/data/forms/footer/schema.json"
import footerUiSchema from "@/web/data/forms/footer/ui.json"

// Model Related
import MFooter from "@/global/git/models/MFooter"
import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"

//SETUP
const pageTitle = "Edit Template Data"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Template", path: "content/template" },
]
const routePath = "/contents/template"

const git = createGit()
const mFooter = new MFooter(git, footerSchema)

const TemplateContentPage = ({}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions

  const [formData, setFormData] = useState(null)
  const [formShown, showForm] = useState(false)
  const [trigger, setTrigger] = useState(false)

  const [alert, setAlert] = useState(null)
  const [tabKey, setTabKey] = useState("footer")
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
  // Footer Related
  const [footerFormShown, showFooterForm] = useState(false)
  const [footerFormData, setFooterFormData] = useState(mFooter.defaultValue)
  const loadFooterData = async () => {
    const data = await mFooter.get()
    console.log(data)
    setFooterFormData(data)
  }
  const showEditFooterForm = () => {
    showFooterForm(true)
  }
  const onSaveFooterForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mFooter.update(formData)
      await mFooter.commit(true)
    } catch (e) {
      displayAlert("danger", "error", e.toString())
    }
    showFooterForm(false)
    showLoading(false)
    loadFooterData()
  }
  const displayAlert = (type, title, message, onConfirm = () => setAlert(null)) => {
    setAlert(
      <SweetAlert type={type} title={title} onConfirm={onConfirm}>
        {message}
      </SweetAlert>,
    )
  }
  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)

    if (tabName === "footer") {
      loadFooterData()
    }
    //else if (tabName === "syarat-administrasi") {
    // 	setSyaratType("administrasi")
  }, [location.key, setTabKey, setFooterFormData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {alert}
            <Tabs id="content-template-tab" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
              <Tab eventKey="footer" title="Footer">
                {tabKey === "footer" && (
                  <>
                    {footerFormShown ? (
                      <>
                        <JsonForm
                          schema={footerSchema}
                          uiSchema={footerUiSchema}
                          title="Edit Footer Data"
                          formData={footerFormData}
                          onCancel={(e) => showFooterForm(false)}
                          onSubmit={(e) => onSaveFooterForm(e)}
                        />
                      </>
                    ) : (
                      <>
                        <RowDataDisplay schema={footerSchema} rowData={footerFormData} title="Footer Data" />
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showEditFooterForm(true)}>
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

export default TemplateContentPage
