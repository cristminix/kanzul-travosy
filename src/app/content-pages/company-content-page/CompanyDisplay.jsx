import Table from "react-bootstrap/Table"
const CompanyDisplay = ({ company, schema }) => {
  return (
    <div className="company-display">
      <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Detail Pondok Pesantren</h4>
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
                <td>{company[prop]}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default CompanyDisplay
