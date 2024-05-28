
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import footerData from "@/web/data/templates/sections/footer.json"
import { randStamp } from "@/global/fn"
export const fetchFooter= createAsyncThunk("fetch-footer", async () => {
    const response = await fetch(`/web/data/footer.json?_=${randStamp()}`)
    return response.json()
})
export const pushFooter = createAsyncThunk("push-footer", async (company) => {
    // create file /web/data/footer.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:{
        footerText:"",
    },
    fetchStatus: ""
}

export const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
      updateFooter: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFooter.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchFooter.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchFooter.rejected, (state) => {
          state.data = footerData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default footerSlice
