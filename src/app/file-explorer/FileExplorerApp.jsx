import useTraverseTree from "./hooks/useTraverseTree"
import Folder from "./components/Folder"
import { useEffect, useState } from "react"
import "./css/file-explorer.css"
import { gitInstance } from "@/global/git"
import { crc32id } from "@/global/fn/crc32id"
import explorer from "./constants/data.js"

const git = gitInstance()
const { fs } = git

const FileExplorerApp = ({isSelected,onSelect, isExpand, setExpand,children }) => {
  const { insertNode } = useTraverseTree()

  const [explorerData, setExplorerData] = useState(explorer)

  const handleFolderFileCreation = (folderID, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderID, item, isFolder)

    setExplorerData(finalTree)
  }
  const walk = async (dstDir = null) => {
    let targetDir = !dstDir ? "/" : dstDir
    const isRootDir = targetDir === "/"
    const ls = await fs.readdirSync(targetDir)
    // console.log(ls)

    let output = {
      id: crc32id(targetDir),
      name: targetDir,
      isFolder: true,
      items: [],
    }

    if (!isRootDir) {
      output = []
    }

    output.isExpanded = isExpand(output.id)
    // output.selected = isSelected(output.id)

    for (const name of ls) {
      if (name === ".git") continue
      const absPath = `${targetDir === "/" ? "" : targetDir}/${name}`
      // console.log(absPath)
      const stat = await fs.statSync(absPath)
      // console.log(stat)
      const isFolder = stat.type === "dir"

      const item = {
        id: crc32id(absPath),
        name,
        isFolder,
        path: absPath,
      }

      if (isFolder) {
        item.isExpanded = isExpand(item.id)
        item.items = await walk(absPath)
      }
      if (isRootDir) output.items.push(item)
      else output.push(item)
    }

    return output
  }
  const generateExplorerData = async () => {
    const data = await walk()
    // return data
    // console.log(data)
    setExplorerData(null)
    setTimeout(() => {
      setExplorerData((oData) => data)
    }, 256)
  }
  useEffect(() => {
    generateExplorerData()
  }, [setExplorerData])
  return (
    <main className="file-explorer-app">
      <div className="left-side">{explorerData ? (
        <Folder
            isSelected={isSelected}
          onSelect={onSelect}
          setExpand={setExpand}
          explorerData={explorerData}
          handleFolderFileCreation={handleFolderFileCreation}
          isRoot={true}
        />
      ) : null}
      </div>
      <div className="right-side">
          {children}
      </div>
    </main>
  )
}

export default FileExplorerApp