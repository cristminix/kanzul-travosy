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
const AsyncButton =({callback,onClick,children})=>{
	const [shown,setShown]=useState(false)
	const runCallback = async()=>{
		callback().then(showButton=>setShown(!showButton))
		// setShown(showButton)
	}
	useEffect(()=>{
		runCallback()
	},[setShown])
	if(shown)
		return <Button size="sm xs" onClick={onClick}>
			{children}
		</Button>
	return null
}
const ProdukList = ({git, className,data, onEditRow = (f) => f , onCompileRow = (f) => f ,validHash=(f)=>true}) => {
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
					<AsyncButton size="sm xs" callback={async(e)=> await validHash(row)} onClick={(e) => onCompileRow(row)}>
						<IconArchive />
					</AsyncButton>
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