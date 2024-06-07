import useTraverseTree from "./hooks/useTraverseTree";
import Folder from "./components/Folder";
import { useEffect, useState } from 'react';
import "./css/file-explorer.css"
import {gitInstance} from "@/global/git"
import {crc32id} from "@/global/fn/crc32id"
import explorer from "./constants/data.js";

const git = gitInstance()
const {fs} = git
const walk=async(dstDir=null)=>{
    let targetDir = !dstDir ? '/' : dstDir
    const isRootDir = targetDir === '/'
    const ls = await fs.readdirSync(targetDir)
    // console.log(ls)
    
    let output = {
        id:crc32id(),
        name : targetDir,
        isFolder:true,
        items:[]
    }

    if(!isRootDir){
        output = []
    }
    for(const name of ls){
        if(name === '.git') continue
        const absPath = `${targetDir==='/'?'':targetDir}/${name}`
        // console.log(absPath)
        const stat = await fs.statSync(absPath)
        // console.log(stat)
        const isFolder = stat.type === 'dir'

        const item = {
            id: crc32id(),
            name,
            isFolder,
            path: absPath
        }

        if(isFolder){
            item.items = await walk(absPath)
        }
        if(isRootDir)
            output.items.push(item)
        else output.push(item)
    }

    return output
}

const FileExplorerApp = () => {

    const { insertNode } = useTraverseTree();

    const [explorerData, setExplorerData] = useState(explorer);

    const handleFolderFileCreation = (folderID, item, isFolder) => {

        const finalTree = insertNode(explorerData, folderID, item, isFolder);

        setExplorerData(finalTree);
    }
    const generateExplorerData= async()=>{
        const data =  await walk()
        // return data
        setExplorerData(data)
    }
    useEffect(()=>{
        generateExplorerData()
    },[setExplorerData])
    return (
        <main className="file-explorer-app">
            <Folder
                explorerData={explorerData}
                handleFolderFileCreation={handleFolderFileCreation}
                isRoot={true}
            />
        </main>
    );
};

export default FileExplorerApp;