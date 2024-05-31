import Form from "@rjsf/bootstrap-4"
import validator from "@rjsf/validator-ajv8"
import formUiSchema from "@/web/data/forms/company/ui.json"
import {Button} from "react-bootstrap"
const CompanyForm = ({formData,schema,onCancel=f=>f,onChange=f=>f,onSubmit=f=>f,onError=f=>f})=>{
	return <div>
	<h4 className="twx-mb-8 text-center">Ubah Data Company</h4>
	<Form
        formData={formData}
        schema={schema}
        uiSchema={formUiSchema}
        validator={validator}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={onError}>
        <div className="twx-flex twx-items-center twx-justify-end">
           <Button variant="default" size="sm" onClick={e=>onCancel()}>
              Batal
          </Button>
          <Button size="sm" type="submit">
            <i className="mdi mdi-content-save"/> Simpan
          </Button>
        </div>
      </Form>
      </div>
}

export default CompanyForm