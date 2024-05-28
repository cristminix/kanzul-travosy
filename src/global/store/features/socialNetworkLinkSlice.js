import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import socialNetworkLinksData from "@/web/data/social-network-links.json"
import { randStamp } from "@/global/fn"
export const fetchSocialNetworkLink = createAsyncThunk("fetch-socialNetworkLinks", async () => {
  const response = await fetch(`/web/data/social-network-links.json?_=${randStamp()}`)
  return response.json()
})
export const pushSocialNetworkLink = createAsyncThunk("push-socialNetworkLinks", async (company) => {
  // create file /web/data/social-network-links.json
  // git add
  // git commit  with message update file above
  // git push

  const pushStatusOk = true
  return pushStatusOk
})

const initialState = {
  data: {
    fb: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    ig: "",
  },
  fetchStatus: "",
}

export const socialNetworkLinkSlice = createSlice({
  name: "socialNetworkLinks",
  initialState,
  reducers: {
    updateSocialNetworkLink: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialNetworkLink.fulfilled, (state, action) => {
        state.data = action.payload
        state.fetchStatus = "success"
      })
      .addCase(fetchSocialNetworkLink.pending, (state) => {
        state.fetchStatus = "loading"
      })
      .addCase(fetchSocialNetworkLink.rejected, (state) => {
        state.data = socialNetworkLinksData
        state.fetchStatus = "error"
      })
  },
})

export default socialNetworkLinkSlice
