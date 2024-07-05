
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import profileData from "@/web/data/profile.json"
import { randStamp } from "@/global/fn"
export const fetchProfile= createAsyncThunk("fetch-profile", async () => {
    const response = await fetch(`/web/data/profile.json?_=${randStamp()}`)
    return response.json()
})

const initialState={
    data:profileData,
    fetchStatus: ""
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      updateProfile: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfile.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchProfile.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchProfile.rejected, (state) => {
          state.data = profileData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default profileSlice
