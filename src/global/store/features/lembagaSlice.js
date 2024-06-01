
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import lembagaData from "@/web/data/lembaga.json"
import { randStamp } from "@/global/fn"
export const fetchLembaga= createAsyncThunk("fetch-lembaga", async () => {
    const response = await fetch(`/web/data/lembaga.json?_=${randStamp()}`)
    return response.json()
})
export const pushLembaga = createAsyncThunk("push-lembaga", async (company) => {
    // create file /web/data/lembaga.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:lembagaData,
    fetchStatus: ""
}

export const lembagaSlice = createSlice({
    name: "lembaga",
    initialState,
    reducers: {
      updateLembaga: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLembaga.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchLembaga.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchLembaga.rejected, (state) => {
          state.data = lembagaData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default lembagaSlice
