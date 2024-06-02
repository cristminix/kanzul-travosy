import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { Button } from "react-bootstrap"
import { Edit as IconEdit } from "react-feather"

const PageList = ({ pages, onEditRow = (f) => f }) => {
	const columns = [
		{
			name: "Name",
			prop: "name",
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
			prop: "path",
			hide: "md",
			selector: (row) => row.path,
		},
		{
			name: "Action",
			prop: "action",
			selector: (row) => row.action,
			cell: (row) => (
				<>
					<Button size="sm" onClick={(e) => onEditRow(row)}>
						<IconEdit /> Edit{" "}
					</Button>
				</>
			),
		},
	]
	const [columnDef, setColumnDef] = useState([...columns])

	const hideColumn = (name) => {
		const filtered = columns.filter((c) => c.prop !== name)
		console.log({ filtered })
		setColumnDef((oColumnDef) => [...filtered])
	}
	console.log({ columnDef })
	useEffect(() => {
		hideColumn("path")
	}, [setColumnDef])
	return (
		<>
			<DataTable
				columns={columnDef}
				data={pages}
				striped={true}
				pagination={true}
				fixedHeader={true}
				fixedHeaderScrollHeight="250px"
				paginationPerPage={5}
			/>
		</>
	)
}

export default PageList