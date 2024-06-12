import Form from "@rjsf/bootstrap-4"
import {customizeValidator} from "@rjsf/validator-ajv8"
import { Button } from "react-bootstrap"
import { Save as IconSave } from "react-feather"
import CustomFileWidget from './components/CustomFileWidget'
import CustomBlockWidget from "./components/CustomBlockWidget"

import {useEffect,useState} from "react"

const widgets = {
    FileWidget: (props) => (
      <CustomFileWidget {...props} ref={ref => {
          this.fileWidget = ref;
      }}/>
    ),
    block: CustomBlockWidget,

  }

const validator = customizeValidator({
  'data-url' : (a,b,c)=>{
    console.log(a,b,c)
  }
})  
const JsonForm = ({
  title,
  formData,
  uiSchema,
  schema,
  onCancel = (f) => f,
  onChange = (f) => f,
  onSubmit = (f) => f,
  onError = (f) => f,
}) => {

const chekBlockFields=(uiSchema,formData)=>{
  const fields = Object.keys(uiSchema)
  const fieldBlocks = []
  for(const field of fields){
    const uiSchemaField = uiSchema[field]
    if(uiSchemaField["ui:widget"]==="block"){
      fieldBlocks.push(field)
    }
  }
  for(const field of fieldBlocks){
    formData[field] = JSON.parse(formData[field])
  }
} 
const onSubmitForm = (e)=>{
  let {formData,uiSchema} = e
  chekBlockFields(uiSchema,formData)
  // console.log(e.formData)
  onSubmit(e)
}

 
  return (
    <div className="json-form">
      {title ? <h4 className="twx-mb-8 text-center">{title}</h4> : null}

      <Form widgets={widgets}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={onChange}
        onSubmit={onSubmitForm}
        onError={onError}>
        <div className="twx-flex twx-items-center twx-justify-end">
          <Button variant="default" size="sm" onClick={(e) => onCancel()}>
            Batal
          </Button>
          <Button size="sm" type="submit">
            <IconSave /> Simpan
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default JsonForm