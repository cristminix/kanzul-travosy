import {Button} from "react-bootstrap"
import JsonView from "react18-json-view"
import { useEffect, useRef, useState } from "react"
import { github, DirectoryListing, dataUrlToFile, dataUrlToUint8Array } from "@cp/cloud/iso-git"
import { getFile64 } from "@cp/global/fn"
import initSqlJs from "sql.js"
import { initOrm } from "../orm/initOrm"
import { cms_user } from "../orm/schema"
const { fs, fsp, dir, git } = github

const SqlJsDemo = ({}) => {
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  const [databasePath, setDatabasePath] = useState(`${dir}/cms.sqlite`)
  const db = null
  const loadDatabase = async () => {
    const database = await initOrm(fsp, databasePath)
    const res = database.select().from(cms_user).all()
    console.log(database)
    console.log(res)
  }
  useEffect(() => {
    loadDatabase()
  }, [])
  return (
    <>
      Sql Js Demo
      <div className="twx-min-h-screen">
        <div className="twx-flex twx-flex-col twx-py-4 twx-justify-between">
          <div className="twx-flex twx-gap-2">
            <div className="twx-flex twx-gap-2"></div>
          </div>
          <div>
            <span>Database : </span>
            <span className="font-mono">{databasePath}</span>
          </div>
        </div>

        {
          // showForm?<MenuForm data={formData} className={containerCls} hideForm={e=>setShowForm(false)}/>:null
        }

        <div className={`native-client ${containerCls}`}>
          <div className="twx-flex twx-flex-col">
            <div className="twx--m-1.5 twx-overflow-x-auto">
              <div className="twx-p-1.5 twx-min-w-full twx-inline-block twx-align-middle">
                <div className="twx-overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SqlJsDemo
