import {useState,useEffect} from "react"
// import Form,{withTheme} from '@rjsf/core';
import Form from '@rjsf/material-ui';
// import { UiSchema  } from '@rjsf/utils/dist';
import validator from '@rjsf/validator-ajv8';
import schema from "@/web/data/forms/company/schema.json"
import uiSchema from "@/web/data/forms/company/ui.json"

const log = (type) => console.log.bind(console, type);

// const theme = { widgets: { test: () => <div>test</div> } };

// const ThemedForm = withTheme(theme);
const CompanyForm =({})=>{ 
  const [formData,setFormData]=useState({})
  
  useEffect(()=>{
    const loadFormData = async()=>{
      const remoteFormData = await fetch(`/web/data/company.json`).then(r=>r.json())
      // console.log(formData)
      setFormData(remoteFormData)
    } 

    loadFormData()
  },[])
  return <div className="twx-border-solid twx-border twx-p-4">
  <Form
    formData={formData}
    schema={schema}
    uiSchema={uiSchema}
    validator={validator}
    onChange={log('changed')}
    onSubmit={log('submitted')}
    onError={log('errors')}
  />
  </div>
}
export default CompanyForm