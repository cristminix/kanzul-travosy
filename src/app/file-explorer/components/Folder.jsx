import React, { useState } from 'react';

import {
    // Folder as IconFolder,
} from "react-feather"

import { 
    Folder as IconFolder,
    FolderPlus as IconFolderPlus,

    Folder2Open as IconFolderOpen,
    FilePlus as IconFilePlus,
    File as IconFile,
    
    CaretRight ,
    CaretDown
} from 'react-bootstrap-icons';

const Folder = ({ isSelected,onSelect,explorerData, handleFolderFileCreation,isRoot ,setExpand}) => {
   
    const [isExpand, setIsExpand] = useState(explorerData.isExpanded);
    const [selected,setSelected] = useState(explorerData.selected)
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });


    const handelClick = (e, isFolder) => {
        e.stopPropagation();

        setIsExpand(true);
        setShowInput({
            visible: true,
            isFolder: isFolder,
        })
    }
    const setExpanded = ()=>{
        const expanded = !isExpand
        setIsExpand(expanded)
        setExpand({
            id:explorerData.id,
            expanded
        })
    }
    const onCreateFolder = (e) => {

        // enter key event...
        if (e.keyCode === 13 && e.target.value) {

            handleFolderFileCreation(explorerData.id, e.target.value, showInput.isFolder);

            setShowInput(pre => ({ ...pre, visible: false }))
        }
    }
    // console.log(explorerData)

    if (explorerData.isFolder) {
        return (
            <section className={`folder ${isRoot?'root-folder':''}`}>
                {/* User Click - Input  */}
                <div onClick={() => {
                        setExpanded()
                        onSelect(explorerData.id,explorerData.path)
                    }
                }
                    className={`folder-wrap ${isSelected(explorerData.id)?'selected':''}`}><div className="icon-wrap">
                    {isExpand?<CaretDown  className="feather-icon"/>:<CaretRight  className="feather-icon"/>}
                    {isExpand?<IconFolderOpen  className="feather-icon"/>:<IconFolder className="feather-icon"/>} <span className="folder-name">{explorerData.name}</span>
                    </div>
                    {/* Folder & File Buttons */}
                    <div className='folder-toolbar-action'>
                    {isExpand?<>
                        <button className='btn-action'
                            onClick={(e) => handelClick(e, true)}>
                            <IconFolderPlus className="feather-icon"/>
                        </button>
                        <button
                            className="btn-action"
                            onClick={(e) => handelClick(e, false)}>
                            <IconFilePlus className="feather-icon"/>
                        </button>
                    </>:null}
                        
                    </div>
                </div>

                {/* User Click - Output Effect */}
                <div style={{ "display": isExpand ? "block" : "none" }}>
                    {
                        showInput.visible && (
                            <div className='ml-5'>
                                <span>{showInput.isFolder ? '📁' : '📄'}</span>
                                <input
                                    autoFocus
                                    type="text"
                                    className='twx-outline-0 twx-border twx-border-gray-300 twx-rounded twx-mt-1 twx-px-1 twx-pt-0'
                                    // clicking outside then close it...
                                    onBlur={() => setShowInput(pre => ({ ...pre, visible: false }))}
                                    onKeyDown={(e) => onCreateFolder(e)}
                                // onChange={(e) => onCreateFolder(e)}
                                />
                            </div>
                        )
                    }
                    {
                        explorerData.items.sort().map(item => (
                            // Recursive function call for printing all children...
                            <Folder
                                key={item.id}
                                isSelected={isSelected} onSelect={onSelect}
                                explorerData={item}
                                setExpand={setExpand}
                                handleFolderFileCreation={handleFolderFileCreation}
                            />
                        ))
                    }
                </div>
            </section>
        );
    }
    else {
        return <div className={`file ${isSelected(explorerData.id)?'selected':''}`} onClick={e=>{
            onSelect(explorerData.id,explorerData.path)
        }}>
            <IconFile className="feather-icon"/><span className="filename">{explorerData.name}</span>
        </div>
    };
};

export default Folder;