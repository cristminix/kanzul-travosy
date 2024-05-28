import { useEffect } from "react"
import Form from "@rjsf/material-ui"
import validator from "@rjsf/validator-ajv8"
import schema from "@/web/data/forms/company/schema.json"
import uiSchema from "@/web/data/forms/company/ui.json"

const CompanyForm = ({ formData }) => {
  const onFormChange = (e) => {
    console.log(e)
  }
  const onFormSubmit = (e) => {
    console.log(e)
  }
  const onFormError = (e) => {
    console.log(e)
  }

  useEffect(() => {}, [])

  return (
    <div className="twx-border-solid twx-border twx-p-4">
      <Form
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        onError={onFormError}
      />
    </div>
  )
}
export default CompanyForm
