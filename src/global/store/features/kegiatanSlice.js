
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import kegiatanData from "@/web/data/kegiatan.json"
import { randStamp } from "@/global/fn"
export const fetchKegiatan= createAsyncThunk("fetch-kegiatan", async () => {
    const response = await fetch(`/web/data/kegiatan.json?_=${randStamp()}`)
    return response.json()
})
export const pushKegiatan = createAsyncThunk("push-kegiatan", async (company) => {
    // create file /web/data/kegiatan.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:kegiatanData,
    fetchStatus: ""
}

export const kegiatanSlice = createSlice({
    name: "kegiatan",
    initialState,
    reducers: {
      updateKegiatan: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchKegiatan.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchKegiatan.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchKegiatan.rejected, (state) => {
          state.data = kegiatanData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default kegiatanSlice
