import { useEffect } from "react"
import Form from "@rjsf/bootstrap-4"
import validator from "@rjsf/validator-ajv8"
import schema from "@/web/data/forms/company/schema.json"
import uiSchema from "@/web/data/forms/company/ui.json"
import { createGit } from "@/global/git"
import MCompany from "@/global/git/models/MCompany"
import { useState } from "react"
const git = createGit()
const mCompay = new MCompany(git, schema)
// console.log(git)
const CompanyForm = ({ formData }) => {
  const [company, setCompany] = useState({ ...mCompay.defaultData })
  const onFormChange = (e) => {
    console.log(e)
  }
  const onFormSubmit = (e) => {
    console.log(e)
  }
  const onFormError = (e) => {
    console.log(e)
  }

  useEffect(() => {
    // if(!git.isCloned()){
    const performGit = async () => {
      const git = createGit()
      await git.init()

      const companyData = await mCompay.get()

      console.log(companyData)
      setCompany(companyData)
      // await git.cleanup()
      // await git.fastForward()
      // await git.log()
    }
    performGit()
    // }
  }, [setCompany])

  return (
    <div className="twx-p-4">
      <Form
        formData={company}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        onError={onFormError}>
        <div>
          <button className="btn btn-sm btn-primary" type="submit">
            Simpan
          </button>
        </div>
      </Form>
    </div>
  )
}
export default CompanyForm
