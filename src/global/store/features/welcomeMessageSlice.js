import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import welcomeMessageData from "@/web/data/templates/blocks/welcome-message.json"
import { randStamp } from "@/global/fn"
export const fetchWelcomeMessage = createAsyncThunk("fetch-welcome-message", async () => {
  const response = await fetch(`/web/data/templates/blocks/welcome-message.json?_=${randStamp()}`)
  return response.json()
})


const initialState = {
  data: {
    title: "",
    content: "",
  },
  fetchStatus: "",
}

export const welcomeMessageSlice = createSlice({
  name: "welcomeMessage",
  initialState,
  reducers: {
    updateWelcomeMessage: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWelcomeMessage.fulfilled, (state, action) => {
        state.data = action.payload
        state.fetchStatus = "success"
      })
      .addCase(fetchWelcomeMessage.pending, (state) => {
        state.fetchStatus = "loading"
      })
      .addCase(fetchWelcomeMessage.rejected, (state) => {
        state.data = welcomeMessageData
        state.fetchStatus = "error"
      })
  },
})

export default welcomeMessageSlice
