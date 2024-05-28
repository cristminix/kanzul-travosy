
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import homepageData from "@/web/data/pages/homepage.json"
import { randStamp } from "@/global/fn"
export const fetchHomepage= createAsyncThunk("fetch-homepage", async () => {
    const response = await fetch(`/web/data/homepage.json?_=${randStamp()}`)
    return response.json()
})
export const pushHomepage = createAsyncThunk("push-homepage", async (company) => {
    // create file /web/data/homepage.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:{
        title:"",
        meta:"",
    },
    fetchStatus: ""
}

export const homepageSlice = createSlice({
    name: "homepage",
    initialState,
    reducers: {
      updateHomepage: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchHomepage.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchHomepage.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchHomepage.rejected, (state) => {
          state.data = homepageData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default homepageSlice
