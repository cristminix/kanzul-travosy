
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import galeryData from "@/web/data/galery.json"
import { randStamp } from "@/global/fn"
export const fetchGalery= createAsyncThunk("fetch-galery", async () => {
    const response = await fetch(`/web/data/galery.json?_=${randStamp()}`)
    return response.json()
})

    
const initialState={
    data:galeryData,
    fetchStatus: ""
}

export const galerySlice = createSlice({
    name: "galery",
    initialState,
    reducers: {
      updateGalery: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGalery.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchGalery.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchGalery.rejected, (state) => {
          state.data = galeryData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default galerySlice
