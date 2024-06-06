
import {useEffect,useState} from "react"
import RowDataDisplay from "../RowDataDisplay"
import {Button} from "react-bootstrap"
import {Edit as IconEdit} from "react-feather"
const BannerEditor = ({schema,uiSchema,page,model,trigger})=>{
	const [rowData,setRowData] = useState(model.defaultValue)
	const loadBannerData = async()=>{
		const data = await model.getData()
		setRowData(data)
	}

	useEffect(()=>{
		loadBannerData()
	},[trigger,setRowData])
	return <>
		<RowDataDisplay title="Detail Banner" 
			schema={schema} 
			rowData={rowData}
			showImages={['image']}/>
		
		<div className="twx-py-4 twx-flex twx-justify-end">
			<Button size="sm"><IconEdit/> Edit</Button>
		</div>
	</>
}

export default BannerEditor