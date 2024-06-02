import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { Button } from "react-bootstrap"
import { Edit as IconEdit } from "react-feather"

const PageList = ({ className,pages, onEditRow = (f) => f }) => {
	const columns = [
		{
			name: "Name",
			prop: "name",
			width:"120px",
			selector: (row) => row.name,
		},
		{
			name: "Title",
			prop: "title",
			selector: (row) => row.title,
		},
		{
			name: "Meta Description",
			prop: "meta-description",
			selector: (row) => row["meta-description"],
		},
		{
			name: "Meta Keyword",
			prop: "meta-keyword",
			selector: (row) => row["meta-keyword"],
		},
		{
			name: "Path",
			prop: "@path",
			hide: "md",
			selector: (row) => row['@path'],
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
	console.log({ columnDef })
	useEffect(() => {
		hideColumn(["@path",'meta-description','meta-keyword'])
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

export default PageList