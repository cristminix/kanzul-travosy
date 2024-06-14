import { useEffect, useState } from "react"
import RowDataDisplay from "../RowDataDisplay"
import { Button } from "react-bootstrap"
import { Edit as IconEdit } from "react-feather"
import JsonForm from "../JsonForm"
const BannerEditor = ({ showLoading, schema, uiSchema, page, model, trigger ,showAlert}) => {
	const [rowData, setRowData] = useState(model.defaultValue)
	const [formShown, showForm] = useState(false)
	const [formData, setFormData] = useState(null)
	const loadBannerData = async () => {
		const data = await model.getData()
		setRowData(data)
	}

	const onSaveForm = async (e) => {
		const { formData } = e
		showLoading(true)
		try{
			await model.update(formData)
			await model.commit(true)
		}catch(e){
      		showAlert("danger","error",e.toString())
		}
		showLoading(false)
		showForm(false)
		loadBannerData()
	}
	useEffect(() => {
		loadBannerData()
	}, [trigger, setRowData])
	return (
		<>
			{formShown ? (
				<>
					<JsonForm
						formData={rowData}
						schema={schema}
						uiSchema={uiSchema}
						onSubmit={(e) => onSaveForm(e)}
						onCancel={(e) => showForm(false)}
					/>
				</>
			) : (
				<>
					<RowDataDisplay title="Detail Banner" schema={schema} rowData={rowData} showImages={["image"]} />

					<div className="twx-py-4 twx-flex twx-justify-end">
						<Button size="sm" onClick={(e) => showForm(true)}>
							<IconEdit /> Edit
						</Button>
					</div>
				</>
			)}
		</>
	)
}

export default BannerEditor