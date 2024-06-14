import contentSlice from "@/global/store/features/contentSlice"

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
import welcomeMessageSchema from "@/web/data/forms/welcome-message/schema.json"
import welcomeMessageUiSchema from "@/web/data/forms/welcome-message/ui.json"
import MWelcomeMessage from "@/global/git/models/MWelcomeMessage"

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
const mWelcomeMessage = new MWelcomeMessage(git, welcomeMessageSchema)

const TemplateContentPage = ({}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const { setLoading, setLoadingMessage, displayAlert } = contentSlice.actions

  const [tabKey, setTabKey] = useState("footer")
  const showLoading = (status, message = "Menyimpan Data") => {
    if (status) {
      dispatch(setLoading(true))
      dispatch(setLoadingMessage(message))
    } else {
      dispatch(setLoading(false))
    }
  }
  const showAlert = (type, title, message) => {
    dispatch(displayAlert(["danger", "error", e.toString()]))
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
      showAlert("danger", "error", e.toString())
    }
    showFooterForm(false)
    showLoading(false)
    loadFooterData()
  }
  const [welcomeMessageFormShown, showWelcomeMessageForm] = useState(false)
  const [welcomeMessageFormData, setWelcomeMessageFormData] = useState(MWelcomeMessage.defaultValue)
  const loadWelcomeMessageData = async () => {
    const data = await mWelcomeMessage.get()
    console.log(data)
    setWelcomeMessageFormData(data)
  }
  const showEditWelcomeMessageForm = () => {
    showWelcomeMessageForm(true)
  }
  const onSaveWelcomeMessageForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mWelcomeMessage.update(formData)
      await mWelcomeMessage.commit(true)
    } catch (e) {
      showAlert("danger", "error", e.toString())
    }
    showWelcomeMessageForm(false)
    showLoading(false)
    loadWelcomeMessageData()
  }
  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)

    if (tabName === "footer") {
      loadFooterData()
    } else if (tabName === "welcome-message") {
      loadWelcomeMessageData()
    }
  }, [location.key, setTabKey, setFooterFormData, setWelcomeMessageFormData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <Tabs id="content-template-tab" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
              <Tab eventKey="welcome-message" title="Welcome Message">
                {tabKey === "welcome-message" && (
                  <>
                    {welcomeMessageFormShown ? (
                      <>
                        <JsonForm
                          schema={welcomeMessageSchema}
                          uiSchema={welcomeMessageUiSchema}
                          title="Edit Welcome Message"
                          formData={welcomeMessageFormData}
                          onCancel={(e) => showWelcomeMessageForm(false)}
                          onSubmit={(e) => onSaveWelcomeMessageForm(e)}
                        />
                      </>
                    ) : (
                      <>
                        <RowDataDisplay
                          schema={welcomeMessageSchema}
                          rowData={welcomeMessageFormData}
                          title="Welcome Message"
                        />
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showEditWelcomeMessageForm(true)}>
                            <i className="mdi mdi-pencil-box-outline" /> Ubah
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </Tab>

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
