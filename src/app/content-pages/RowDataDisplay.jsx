import Table from "react-bootstrap/Table"

const RowDataDisplay = ({ rowData,title, schema,showImages=[] }) => {
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
                <td>{showImages.includes(prop)? <div className="twx-bg-green-200">
                  <img className="!twx-w-[100%] !twx-h-auto !twx-rounded-lg" src={rowData[prop]}/>
                </div> : rowData[prop]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default RowDataDisplay