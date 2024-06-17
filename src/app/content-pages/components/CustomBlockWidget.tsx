import BlockEditor from "./BlockEditor"
import {arrayToBlockData} from "@/global/fn/arrayToBlockData"
import { useEffect, useRef, useCallback } from "react"
import { createReactEditorJS } from "react-editor-js"
import { EDITOR_JS_TOOLS } from "./editor-js-tools"
const ReactEditorJS = createReactEditorJS()

const CustomBlockWidget = (props: WidgetProps) => {

  const editorRef = useRef(null)
  const inputRef = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance
  }, [])
  
  const updateValue = (data) => {
    if(data)
    editorRef.current._editorJS.isReady.then(() => {
      editorRef.current._editorJS.render(data)
    })
  }
 

  const onEditorChange=async(api,block)=>{
    console.log(api,block)
    const savedData = await api.saver.save()
    const {blocks} = savedData
    // console.log(blocks)
    props.onChange(JSON.stringify(blocks))
  }
  
  useEffect(() => {
    if(Array.isArray(props.value))
      setTimeout(() => {
        updateValue(arrayToBlockData(props.value))
        props.onChange(JSON.stringify(props.value))

      }, 256)
       
  }, [props.value])

  return (<>
    <ReactEditorJS onInitialize={handleInitialize}  onChange={onEditorChange} tools={EDITOR_JS_TOOLS} />
  </>)
}

export default CustomBlockWidget