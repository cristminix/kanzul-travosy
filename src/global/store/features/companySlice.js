
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import companyData from "@/web/data/company.json"
import { randStamp } from "@/global/fn"
export const fetchCompany= createAsyncThunk("fetch-company", async () => {
    const response = await fetch(`/web/data/company.json?_=${randStamp()}`)
    return response.json()
})
export const pushCompany = createAsyncThunk("push-company", async (company) => {
    // create file /web/data/company.json
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    
const initialState={
    data:{
        name:"",
        shortAddress:"",
        address:"",
        whatsapp:"",
        phone:"",
        email:"",
    },
    fetchStatus: ""
}

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
      updateCompany: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCompany.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchCompany.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchCompany.rejected, (state) => {
          state.data = companyData
          state.fetchStatus = "error"
        })
    },
  })
  
  export default companySlice
