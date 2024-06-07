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

const Folder = ({ explorerData, handleFolderFileCreation,isRoot }) => {

    const [isExpand, setIsExpand] = useState(false);
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
                <div onClick={() => setIsExpand(pre => !pre)}
                    className="folder-wrap"><div>
                    {isExpand?<CaretDown  className="feather-icon"/>:<CaretRight  className="feather-icon"/>}
                    {isExpand?<IconFolderOpen  className="feather-icon"/>:<IconFolder className="feather-icon"/>} <span className="folder-name">{explorerData.name}</span>
                    </div>
                    {/* Folder & File Buttons */}
                    <div className='folder-toolbar-action'>
                        <button className='btn-action'
                            onClick={(e) => handelClick(e, true)}>
                            <IconFolderPlus className="feather-icon"/>
                        </button>
                        <button
                            className="btn-action"
                            onClick={(e) => handelClick(e, false)}>
                            <IconFilePlus className="feather-icon"/>
                        </button>
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
                                explorerData={item}
                                handleFolderFileCreation={handleFolderFileCreation}
                            />
                        ))
                    }
                </div>
            </section>
        );
    }
    else {
        return <div className='file'>
            <IconFile className="feather-icon"/><span className="filename">{explorerData.name}</span>
        </div>
    };
};

export default Folder;