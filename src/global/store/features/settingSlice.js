
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  hideGitNotReadyMessage : false
}

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setHideGitNotReadyMessage: (state,action) => {
    	state.hideGitNotReadyMessage =  action.payload
    }
  },
})
export default settingSlice
