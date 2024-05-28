
import { useDispatch, useSelector } from "react-redux"
import WelcomeMessageForm from "@/admin/components/forms/WelcomeMessageForm"
import welcomeMessageSlice, { fetchWelcomeMessage } from "@/global/store/features/welcomeMessageSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const WelcomeMessage = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { welcomeMessage } = state
  const { updateWelcomeMessage } = welcomeMessageSlice.actions
  console.log(welcomeMessage)
  useEffect(() => {
    dispatch(fetchWelcomeMessage())
    // loadWelcomeMessage()
  }, [dispatch])
  return (
    <>
      <h4>Edit WelcomeMessage</h4>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <WelcomeMessageForm formData={welcomeMessage.data} />}
      <div>{/* <WelcomeMessageForm/> */}</div>
    </>
  )
}

export default WelcomeMessage

  
  