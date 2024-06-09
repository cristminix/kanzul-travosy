import { createSlice } from "@reduxjs/toolkit"
import {crc32id} from "@/global/fn/crc32id"
const initialState = {
  isLoading: 0,
  loadingMessage: "",
  alert: {
    message:'',
    type:'',
    title:'',
  },
  alertId:null
}

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    displayAlert: (state, action) => {
      console.log(action)
      const [type,title,message] = action.payload
      state.alert = {...state.alert, type,title,message}
      state.alertId=crc32id()
    },
    hideAlert:(state,action)=>{
      state.alertMessage=message
      state.alertType=type
      state.alertTitle=title
      state.showAlert=true
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setLoadingMessage: (state, action) => {
      state.loadingMessage = action.payload
    },
  },
})
export default contentSlice
