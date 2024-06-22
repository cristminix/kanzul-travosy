
import { createSlice } from "@reduxjs/toolkit"
import { crc32id } from '../../fn/crc32id';

const initialState = {
  hideGitNotReadyMessage : false,
  clientId: null
}

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setHideGitNotReadyMessage: (state,action) => {
      state.hideGitNotReadyMessage =  action.payload
    },
    updateClientId:(state,action)=>{
      if(!state.clientId){
        state.clientId = crc32id()
      }
    }
  },
})
export default settingSlice
