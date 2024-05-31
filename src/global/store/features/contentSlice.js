
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  isLoading: 0,
  loadingMessage:'',
}

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLoading: (state,action) => {
    	state.isLoading= action.payload
    },
    setLoadingMessage:(state,action) =>{
    	state.loadingMessage = action.payload
    }
  },
})
export default contentSlice
