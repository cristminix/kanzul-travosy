import { useDispatch, useSelector } from "react-redux"
import WebNavigationForm from "@/admin/components/forms/WebNavigationForm"
import webNavigationSlice, { fetchWebNavigation } from "@/global/store/features/webNavigationSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const WebNavigation = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { webNavigation } = state
  const { updateWebNavigation } = webNavigationSlice.actions
  console.log(webNavigation)
  useEffect(() => {
    dispatch(fetchWebNavigation())
    // loadWebNavigation()
  }, [dispatch])
  return (
    <>
      <h4>Edit WebNavigation</h4>
      {webNavigation ? (
        <>
          {webNavigation.fetchStatus == "loading" && <LoadingDot />}
          {webNavigation.fetchStatus == "success" && <WebNavigationForm formData={webNavigation.data} />}
        </>
      ) : null}

      <div>{/* <WebNavigationForm/> */}</div>
    </>
  )
}

export default WebNavigation
