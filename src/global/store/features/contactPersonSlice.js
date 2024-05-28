
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import contactPersonData from "@/web/data/contact-person-list.json"
import { randStamp } from "@/global/fn"
export const fetchContactPerson= createAsyncThunk("fetch-contactPerson", async () => {
    const response = await fetch(`/web/data/contact-person-list.json?_=${randStamp()}`)
    return response.json()
})
export const pushContactPerson = createAsyncThunk("push-contactPerson", async (company) => {
    // create file /web/data/contact-person-list.json
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

export const contactPersonSlice = createSlice({
    name: "contactPerson",
    initialState,
    reducers: {
      updateContactPerson: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchContactPerson.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchContactPerson.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchContactPerson.rejected, (state) => {
          state.data = contactPersonData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default contactPersonSlice
