import Table from "react-bootstrap/Table"
import {isBlockData} from "@/global/fn/isBlockData"
import BlockData from "@/global/components/BlockData"

const RowDataDisplay = ({ rowData, title, schema, showImages = [] }) => {
  return (
    <div className="row-data-display">
      <div className="row-data-display-wrap">
        {Object.keys(schema.properties).map((prop, index) => {
          return (
            <div className="row-data-display-item">
              <div className="prop-wrap">{schema.properties[prop].title}</div>
              <div className="prop-value">
                {showImages.includes(prop) ? (
                  <>
                    {rowData && (
                      <div className="image-wrap twx-max-w-[400px]">
                        <img className={`prop-${prop}  !twx-rounded-lg`} src={rowData[prop]} />
                      </div>
                    )}
                  </>
                ) : (<>
                  {rowData && <>
                      {isBlockData(rowData[prop]) ? <BlockData data={rowData[prop]}/>:<>
                      <p className="twx-line-clamp-6" title={rowData[prop]}>
                        {rowData[prop]}
                      </p>
                      </>}  
                  </>}
                </>)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RowDataDisplay
