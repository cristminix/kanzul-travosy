import Table from "react-bootstrap/Table"
const RowDataDisplay = ({ rowData,title, schema }) => {
  return (
    <div className="row-data-display">
      <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">{title}</h4>
      <Table striped bordered hover>
        {/*<thead>
          <tr>
            <th>Props</th>
            <th>Value</th>
          </tr>
        </thead>*/}
        <tbody>
          {Object.keys(schema.properties).map((prop, index) => {
            return (
              <tr>
                <td>{schema.properties[prop].title}</td>
                <td>{rowData[prop]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default RowDataDisplay