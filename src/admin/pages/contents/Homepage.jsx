import { useDispatch, useSelector } from "react-redux"
import HomepageForm from "@/admin/components/forms/HomepageForm"
// import homepageSlice, { fetchHomepage } from "@/global/store/features/homepageSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Homepage = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { homepage } = state
  // const { updateHomepage } = homepageSlice.actions
  console.log(homepage)
  useEffect(() => {
    // dispatch(fetchHomepage())
    // loadHomepage()
  }, [dispatch])
  return (
    <>
      <h4>Edit Homepage</h4>
      <div>{/* <HomepageForm/> */}</div>
    </>
  )
}

export default Homepage
