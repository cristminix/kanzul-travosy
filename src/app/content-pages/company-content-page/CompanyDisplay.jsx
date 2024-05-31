import Table from "react-bootstrap/Table"
const CompanyDisplay = ({ company, schema }) => {
  return (
    <div className="company-display">
      <h4>Detail Company</h4>
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
