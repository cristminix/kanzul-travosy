
  import { useEffect } from "react"
  import Form from "@rjsf/bootstrap-4"
  import validator from "@rjsf/validator-ajv8"
  import schema from "@/web/data/forms/galery/schema.json"
  import uiSchema from "@/web/data/forms/galery/ui.json"
  
  const GaleryForm = ({ formData }) => {
    const onFormChange = (e)=>{
      console.log(e)
    }
    const onFormSubmit = (e)=>{
      console.log(e)
    }
    const onFormError = (e)=>{
      console.log(e)
    }
  
    useEffect(() => {
    }, [])
  
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
  export default GaleryForm  
        