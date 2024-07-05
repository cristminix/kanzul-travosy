
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import kontakData from "@/web/data/kontak.json"
import { randStamp } from "@/global/fn"
export const fetchKontak= createAsyncThunk("fetch-kontak", async () => {
    const response = await fetch(`/web/data/kontak.json?_=${randStamp()}`)
    return response.json()
})

const initialState={
    data:kontakData,
    fetchStatus: ""
}

export const kontakSlice = createSlice({
    name: "kontak",
    initialState,
    reducers: {
      updateKontak: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchKontak.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchKontak.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchKontak.rejected, (state) => {
          state.data = kontakData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default kontakSlice
