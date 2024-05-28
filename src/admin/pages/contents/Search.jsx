
import { useDispatch, useSelector } from "react-redux"
import SearchForm from "@/admin/components/forms/SearchForm"
import searchSlice, { fetchSearch } from "@/global/store/features/searchSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Search = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { search } = state
  const { updateSearch } = searchSlice.actions
  console.log(search)
  useEffect(() => {
    dispatch(fetchSearch())
    // loadSearch()
  }, [dispatch])
  return (
    <>
      <h4>Edit Search</h4>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <SearchForm formData={search.data} />}
      <div>{/* <SearchForm/> */}</div>
    </>
  )
}

export default Search

  
  