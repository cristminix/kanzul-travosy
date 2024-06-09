import FileExplorerApp from "@/app/file-explorer/FileExplorerApp"
import { useSelector, useDispatch } from "react-redux"
import explorerSlice from "@/global/store/features/explorerSlice"
import MainContentLayout from "./MainContentLayout"
import { addListener } from "@reduxjs/toolkit/react"
import { useEffect, useState } from 'react';
import FilePreview from "./components/FilePreview"
const FilesContentPage = ({}) => {
	const dispatch = useDispatch()
	const contentState = useSelector((state) => state.content)
	const explorerState = useSelector((state) => state.explorer)
	const { setExpanded,setSelected } = explorerSlice.actions
	const pageTitle = "Files"
	const breadcrumbs = [
		{ title: "Konten", path: "contents" },
		{ title: "Files", path: "content/files" },
	]
	// console.log(explorerState.expanded)
	const isExpand = (id) => {
		return explorerState.expanded[id] ? true : false
	}
	const setExpand = (payload) => {
		// console.log(payload)
		dispatch(setExpanded(payload))
	}
	const onSelectItem = (id,path)=>{
		// console.log(payload)
		dispatch(setSelected({id,path}))
	}
	const isSelected = (id)=>{
		if(!explorerState.selected) return false
		return explorerState.selected.id === id
	}
	const [filePreview,setFilePreview]=useState({id:null,path:null})
	
	useEffect(() => {
		const unsubscribe = dispatch(
			addListener({
				predicate: (action, currentState, prevState) => {
					// console.log(currentState)
					return currentState.explorer.selected !== prevState.explorer.selected
				},
				effect: (action, listenerApi) => {
					setFilePreview(oData=>({...oData,...action.payload}))

					// console.log(action,listenerApi)
					// some logic here that will run when `state.some.field` changes
				},
			}),
		)

		return unsubscribe
	}, [])
	return (
		<MainContentLayout
			pageTitle={pageTitle}
			breadcrumbs={breadcrumbs}
			className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
			<div className="col-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<FileExplorerApp isSelected={isSelected} onSelect={onSelectItem} isExpand={isExpand} setExpand={setExpand}>
							<div className="file-preview">
								<FilePreview id={filePreview.id} path={filePreview.path}/>
							</div>
						</FileExplorerApp>
					</div>
				</div>
			</div>
		</MainContentLayout>
	)
}

export default FilesContentPage