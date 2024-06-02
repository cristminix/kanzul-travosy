import Form from "@rjsf/bootstrap-4"
import validator from "@rjsf/validator-ajv8"
import { Button } from "react-bootstrap"
import { Save as IconSave } from "react-feather"

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
  return (
    <div>
      {title ? <h4 className="twx-mb-8 text-center">{title}</h4> : null}

      <Form
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={onChange}
        onSubmit={onSubmit}
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