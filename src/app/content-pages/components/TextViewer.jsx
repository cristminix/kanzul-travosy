import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { dracula } from "@uiw/codemirror-themes-all"
import {useState,useCallback,useEffect} from "react"
import {dataURLtoFile} from "@/global/fn/dataURLtoFile"

function TextViewer({ git, src, onChange, extensions }) {
  const [value, setValue] = useState("")
  
  const onChanges = useCallback((val, viewUpdate) => {
    console.log("val:", val)
    setValue(val)
    onChange&& onChange(val)
  }, [])
  
  const loadFile = async()=>{
    const file = dataURLtoFile(src)
    const reader = new FileReader()
    const text = await reader.readAsText(file, "UTF-8")
    reader.onload = function (evt) {
      setValue(evt.target.result)
    }
    reader.onerror = function (evt) {
      console.log(evt)
      
    }
    console.log(text)
  }  

  useEffect(()=>{
    if(src){
      loadFile()
    }
  },[src])
  return (
    <CodeMirror
      theme={dracula}
      value={value}
      height="500px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChanges}
    />
  )
}
export default TextViewer
