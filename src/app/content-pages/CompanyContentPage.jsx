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
import companySchema from "@/web/data/forms/company/schema.json"
import companyUiSchema from "@/web/data/forms/company/ui.json"

import contactPersonSchema from "@/web/data/forms/contact-person/schema.json"
import contactPersonUiSchema from "@/web/data/forms/contact-person/ui.json"


import MCompany from "@/global/git/models/MCompany"
import MContactPerson from "@/global/git/models/MContactPerson"
import JsonForm from "./JsonForm"
import RowDataDisplay from "./RowDataDisplay"
import ContactPersonList from "./components/ContactPersonList"

const git = createGit()
const mCompany = new MCompany(git, companySchema)
const mContactPeron = new MContactPerson(git, contactPersonSchema)

const pageTitle = "Konten Company"
const breadcrumbs = [
  { title: "Konten", path: "contents" },
  { title: "Company", path: "content/company" },
] 

const routePath = "/contents/company"


const CompanyContentPage = ({ subModule }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage,displayAlert } = contentSlice.actions

  const [tabKey, setTabKey] = useState("banner")

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

  const [contactPersonListData, setContactPersonListData] = useState([])
  const [contactPersonFormData, setContactPersonFormData] = useState(mContactPeron.defaultValue)
  const [contactPersonFormShown, showContactPersonForm] = useState(false)
  
  const loadContactPersonListData = async () => {
    const data = await mContactPeron.getData()
    setContactPersonListData(data)
  }
  const showContactPersonEditForm = (row, type) => {
    setContactPersonFormData(row)
    showContactPersonForm(true)
  }

  const onSaveContactPersonForm = async (e, type) => {
    const { formData } = e
    showLoading(true)
    try {
      await mContactPeron.updateRow(formData, true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))

    }

    showLoading(false)
    showContactPersonForm(false)
    loadContactPersonListData()
  }

  const [companyFormData, setCompanyFormData] = useState(mCompany.defaultValue)
  const [companyFormShown, showCompanyForm] = useState(false)

  const loadCompanyData = async () => {
    const data = await mCompany.get()
    setCompanyFormData(data)
  }
  const showCompanyEditForm = () => {
    showCompanyForm(true)
  }
  const onSaveCompanyForm = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await mCompany.update(formData)
      await mCompany.commit(true)
    } catch (e) {
      dispatch(displayAlert(["danger","error",e.toString()]))
    }

    showLoading(false)
    showCompanyForm(false)
    loadCompanyData()
  }

  useEffect(() => {
    const pathnames = location.pathname.split("/")
    const tabName = pathnames.at(-1)
    setTabKey(tabName)
    // setTrigger(crc32id())

    if (tabName === "company") {
      loadCompanyData()
    } 
    else if (tabName === "contact-person") {
      loadContactPersonListData()
    } 
  }, [location.key, setTabKey,setCompanyFormData,setContactPersonListData])
  return (
    <MainContentLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <Tabs id="content-company-tab" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
              <Tab eventKey="company" title="Company">
                {tabKey === "company" && (
                  <>
                    {!companyFormShown ? (
                      <>
                        <RowDataDisplay title="Company Details" rowData={companyFormData} schema={companySchema}/>
                        <div className="twx-py-4 twx-flex twx-justify-end">
                          <Button size="sm" onClick={(e) => showCompanyEditForm(true)}>
                            <i className="mdi mdi-pencil-box-outline" /> Ubah
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Company Details`}
                          formData={companyFormData}
                          schema={companySchema}
                          uiSchema={companyUiSchema}
                          onSubmit={(e) => onSaveCompanyForm(e)}
                          onCancel={(e) => showCompanyForm(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              <Tab eventKey="contact-person" title="Contact Person">
                {tabKey === "contact-person" && (
                  <>
                    {!contactPersonFormShown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Contact Person</h4>
                        <ContactPersonList
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={contactPersonListData}
                          onEditRow={(row) => showContactPersonEditForm(row)}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={`Edit Contact Person`}
                          formData={contactPersonFormData}
                          schema={contactPersonSchema}
                          uiSchema={contactPersonUiSchema}
                          onSubmit={(e) => onSaveContactPersonForm(e)}
                          onCancel={(e) => showContactPersonForm(false)}
                        />
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

export default CompanyContentPage
