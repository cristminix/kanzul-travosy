
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import pendaftaranData from "@/web/data/pendaftaran.json"
import { randStamp } from "@/global/fn"
export const fetchPendaftaran= createAsyncThunk("fetch-pendaftaran", async () => {
    const response = await fetch(`/web/data/pendaftaran.json?_=${randStamp()}`)
    return response.json()
})
export const pushPendaftaran = createAsyncThunk("push-pendaftaran", async (company) => {
    // create file /web/data/pendaftaran.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:pendaftaranData,
    fetchStatus: ""
}

export const pendaftaranSlice = createSlice({
    name: "berita",
    initialState,
    reducers: {
      updatePendaftaran: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPendaftaran.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchPendaftaran.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchPendaftaran.rejected, (state) => {
          state.data = pendaftaranData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default pendaftaranSlice
