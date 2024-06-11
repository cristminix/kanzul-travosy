import Table from "react-bootstrap/Table"

const RowDataDisplay = ({ rowData, title, schema, showImages = [] }) => {
  return (
    <div className="row-data-display">
      <h4 className="heading">{title}</h4>
      <div className="row-data-display-wrap">
        {Object.keys(schema.properties).map((prop, index) => {
          return (
            <div className="row-data-display-item">
              <div className="prop-wrap">{schema.properties[prop].title}</div>
              <div className="prop-value">
                {showImages.includes(prop) ? (
                  <>
                    {rowData && (
                      <div className="image-wrap">
                        <img className={`prop-${prop}  !twx-rounded-lg`} src={rowData[prop]} />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="twx-line-clamp-6" title={rowData ? rowData[prop]:''}>{rowData && rowData[prop]}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RowDataDisplay
