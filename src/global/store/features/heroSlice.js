
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import heroData from "@/web/data/hero.json"
import { randStamp } from "@/global/fn"
export const fetchHero= createAsyncThunk("fetch-hero", async () => {
    const response = await fetch(`/web/data/hero.json?_=${randStamp()}`)
    return response.json()
})
export const pushHero = createAsyncThunk("push-hero", async (company) => {
    // create file /web/data/hero-list.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:heroData,
    fetchStatus: ""
}

export const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
      updateHero: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchHero.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchHero.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchHero.rejected, (state) => {
          state.data = heroData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default heroSlice
