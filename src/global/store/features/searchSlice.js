
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import searchData from "@/web/data/search.json"
import { randStamp } from "@/global/fn"
export const fetchSearch= createAsyncThunk("fetch-search", async () => {
    const response = await fetch(`/web/data/search.json?_=${randStamp()}`)
    return response.json()
})

    
const initialState={
    data:{
        action:"",
    },
    fetchStatus: ""
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      updateSearch: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearch.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchSearch.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchSearch.rejected, (state) => {
          state.data = searchData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default searchSlice
