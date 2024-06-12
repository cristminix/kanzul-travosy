import { useEffect, useRef, useCallback } from "react"
import { createReactEditorJS } from "react-editor-js"
import { EDITOR_JS_TOOLS } from "./editor-js-tools"
import { Button } from "react-bootstrap"
import { Save as IconSave, RefreshCw as IconRefresh } from "react-feather"

const ReactEditorJS = createReactEditorJS()

const BlockEditor = ({ title, data, onSave }) => {
	const editorRef = useRef(null)

	const handleInitialize = useCallback((instance) => {
		editorRef.current = instance
	}, [])
	const updateValue = () => {
		if(data)
		editorRef.current._editorJS.isReady.then(() => {
			editorRef.current._editorJS.render(data)
		})
	}
	const handleSave = useCallback(async () => {
		const savedData = await editorRef.current.save()
		onSave && onSave(savedData)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			updateValue()
		}, 256)
	}, [data])

	return (
		<div className="block-editor">
			<h4 className="twx-p-4 twx-text-2xl">{title}</h4>
			<div className="twx-flex twx-justify-between twx-p-2 twx-gap-2">
				{/*<Button size="sm" onClick={(e) => updateValue()}>
					<IconRefresh className="feather-icon" />
					Load
				</Button>*/}
				<Button size="sm" onClick={(e) => handleSave()}>
					<IconSave className="feather-icon" />
					Simpan
				</Button>
			</div>
			<div className="twx-border twx-border-gray-300">
				<ReactEditorJS onInitialize={handleInitialize} value={null} tools={EDITOR_JS_TOOLS} />
			</div>
		</div>
	)
}

export default BlockEditor