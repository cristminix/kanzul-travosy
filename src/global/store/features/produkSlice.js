
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import produkData from "@/web/data/produk.json"
import { randStamp } from "@/global/fn"
export const fetchProduk= createAsyncThunk("fetch-produk", async () => {
    const response = await fetch(`/web/data/produk/produk.json?_=${randStamp()}`)
    return response.json()
})
export const pushProduk = createAsyncThunk("push-produk", async (company) => {
    // create file /web/data/produk.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:produkData,
    fetchStatus: ""
}

export const produkSlice = createSlice({
    name: "produk",
    initialState,
    reducers: {
      updateProduk: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProduk.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchProduk.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchProduk.rejected, (state) => {
          state.data = produkData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default produkSlice
