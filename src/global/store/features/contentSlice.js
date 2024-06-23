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
  toast: {
    message:'',
    type:'',
    title:'',
  },
  alertId:null,
  toastId:null,
  showAlert:false,
  showToast:false
}

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    hideAlert:(state,action)=>{
      state.showAlert = false
    },
    hideToast:(state,action)=>{
      state.showToast = false
    },
    displayAlert: (state, action) => {
      // console.log(action)
      const [type,title,message] = action.payload
      state.alert = {...state.alert, type,title,message}
      state.showAlert=true
      state.alertId=crc32id()
    },
    displayToast: (state, action) => {
      // console.log(action)
      const [type,title,message] = action.payload
      state.toast = {...state.toast, type,title,message}
      state.toastId=crc32id()
      state.showToast=true
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
