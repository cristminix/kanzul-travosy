
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  expanded : {},
  selected : null
}

export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    setExpanded: (state,action) => {
      const {id,expanded}=action.payload
      // console.log(id,expanded)
      const item = {[id]:expanded}
      // console.log(action.payload)
    	state.expanded = {...state.expanded, ...item }  
    },
    setSelected:(state,action)=>{
      state.selected = action.payload
    }
  },
})
export default explorerSlice
