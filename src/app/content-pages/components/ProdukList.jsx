import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { Button } from "react-bootstrap"
import { Edit as IconEdit, Archive as IconArchive } from "react-feather"
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
const ProdukList = ({git, className,data, onEditRow = (f) => f , onCompileRow = (f) => f }) => {
	const columns = [
		{
			name: "No",
			prop: "no",
			width:"50px",
			selector: (row,index) => index+1,
			cell:(row, index, column, id) => `${index+1}.`
		},
		{
			name: "Gambar",
			prop: "cover",
			width:"130px",
			selector: (row) => row.cover,
			cell: (row) => (<LazyLoadImage className="twx-max-w-[100px]" src={`/assets/images/produk/covers/${row.cover}`}/>)
		},
		{
			name: "Nama Produk",
			prop: "title",
			width:"270px",
			selector: (row) => row.title,
		},
		{
			name: "Keterangan",
			width:"300px",
			
			prop: "headline",
			selector: (row) => row.headline,
		},
		{
			name: "Action",
			width:"120px",
			prop: "action",
			selector: (row) => row.action,
			cell: (row) => (
				<>
					<Button size="sm xs" onClick={(e) => onEditRow(row)}>
						<IconEdit />
					</Button>
					<Button size="sm xs" onClick={(e) => onCompileRow(row)}>
						<IconArchive />
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

export default ProdukList