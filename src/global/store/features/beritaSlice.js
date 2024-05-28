
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import beritaData from "@/web/data/berita-list.json"
import { randStamp } from "@/global/fn"
export const fetchBerita= createAsyncThunk("fetch-berita", async () => {
    const response = await fetch(`/web/data/berita-list.json?_=${randStamp()}`)
    return response.json()
})
export const pushBerita = createAsyncThunk("push-berita", async (company) => {
    // create file /web/data/berita-list.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:[],
    fetchStatus: ""
}

export const beritaSlice = createSlice({
    name: "berita",
    initialState,
    reducers: {
      updateBerita: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBerita.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchBerita.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchBerita.rejected, (state) => {
          state.data = beritaData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default beritaSlice
