import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { Button } from "react-bootstrap"
import { Edit as IconEdit } from "react-feather"
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
const LembagaList = ({git, className,pages, onEditRow = (f) => f }) => {
	const columns = [
		{
			name: "No",
			prop: "no",
			width:"50px",
			selector: (row,index) => index+1,
			cell:(row, index, column, id) => `${index+1}.`
		},
		{
			name: "Logo",
			prop: "image",
			width:"130px",
			selector: (row) => row.image,
			cell: (row) => (<img className="twx-max-w-[100px]" src={row.image}/>)
		},
		{
			name: "Nama Lembaga",
			prop: "name",
			width:"270px",
			selector: (row) => row.name,
		},
		{
			name: "Keterangan",
			width:"300px",
			
			prop: "description",
			selector: (row) => row.description,
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
				data={pages}
				striped={true}
				pagination={true}
				fixedHeader={true}
				/*fixedHeaderScrollHeight="250px"
				paginationPerPage={5}*/
			/>
		</div>
	)
}

export default LembagaList