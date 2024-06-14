import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { Button } from "react-bootstrap"
import { Edit as IconEdit } from "react-feather"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BlockData from "@/global/components/BlockData"

const AsyncImage=({callback,className})=>{
	const [source,setSource] = useState(null)
	useEffect(()=>{
		if(typeof callback === 'function'){
			callback().then(src=>setSource(src))
		}
	},[callback])
	if(source) return <img className={className} src={source}/>
		return 'loading ...'
}
const HeroList = ({git, className,data, onEditRow = (f) => f }) => {
	const columns = [
		{
			name: "No",
			prop: "no",
			width:"50px",
			selector: (row,index) => index+1,
			cell:(row, index, column, id) => `${index+1}.`
		},
		{
			name: "Image",
			prop: "image",
			width:"130px",
			selector: (row) => row.image,
			cell: (row) => (<LazyLoadImage className="twx-max-w-[100px]" src={row.image}/>)
		},
		{
			name: "Title",
			prop: "title",
			width:"270px",
			selector: (row) => row.title,
			cell: (row) => (<BlockData  className="twx-text-left" data={row.title}/>)

		},
		{
			name: "Keterangan",
			width:"300px",
			
			prop: "description",
			selector: (row) => row.description,
			cell: (row) => (<BlockData className="twx-text-left"  data={row.description}/>)

		},
		{
			name: "Action",
			width:"120px",
			prop: "action",
			selector: (row) => row.action,
			cell: (row) => (
				<>
					<Button size="sm xs" onClick={(e) => onEditRow(row)}>
						<IconEdit /> Edit{" "}
					</Button>
				</>
			),
		},
	]
	const [columnDef, setColumnDef] = useState([...columns])

	const hideColumn = (name) => {
		// let filtered
		const filtered = columns.filter((c) => !Array.isArray(name)?c.prop !== name:!name.includes(c.prop))
		console.log({ filtered })
		setColumnDef((oColumnDef) => [...filtered])
	}
	// console.log({ columnDef })
	useEffect(() => {
		// hideColumn(["path",'meta-description','meta-keyword'])
	}, [setColumnDef])
	return (
		<div className={className}>
			<DataTable
				columns={columnDef}
				data={data}
				striped={true}
				pagination={true}
				fixedHeader={true}
				/*fixedHeaderScrollHeight="250px"
				paginationPerPage={5}*/
			/>
		</div>
	)
}

export default HeroList