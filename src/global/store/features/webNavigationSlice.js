
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import webNavigationData from "@/web/data/web-navigation-list.json"
import { randStamp } from "@/global/fn"
export const fetchWebNavigation= createAsyncThunk("fetch-webNavigation", async () => {
    const response = await fetch(`/web/data/web-navigation-list.json?_=${randStamp()}`)
    return response.json()
})

    
const initialState={
    data:[],
    fetchStatus: ""
}

export const webNavigationSlice = createSlice({
    name: "webNavigation",
    initialState,
    reducers: {
      updateWebNavigation: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchWebNavigation.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchWebNavigation.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchWebNavigation.rejected, (state) => {
          state.data = webNavigationData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default webNavigationSlice
