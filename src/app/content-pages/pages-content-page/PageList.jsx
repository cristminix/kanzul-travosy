import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Name',
		selector: row => row.name,
	},
	{
		name: 'Title',
		selector: row => row.title,
	},
	{
		name: 'Meta Description',
		selector: row => row['meta-description'],
	},
	{
		name: 'Meta Keyword',
		selector: row => row['meta-keyword'],
	},
	{
		name: 'Path',
		selector: row => row.path,
	},
];

const data = [
  	{
		id: 1,
		name: 'Beetlejuice',
		path: '1988',
	},
	{
		id: 2,
		name: 'Ghostbusters',
		path: '1984',
	},
]
const PageList = ({pages})=>{
	return <>
		<DataTable columns={columns} data={pages} />
	</>
}

export default PageList