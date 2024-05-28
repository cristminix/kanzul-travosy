import { useDispatch, useSelector } from "react-redux"
import SocialNetworkLinkForm from "@/admin/components/forms/SocialNetworkLinkForm"
import socialNetworkLinkSlice, { fetchSocialNetworkLink } from "@/global/store/features/socialNetworkLinkSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const SocialNetworkLink = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { socialNetworkLink } = state
  const { updateSocialNetworkLink } = socialNetworkLinkSlice.actions
  console.log(socialNetworkLink)
  useEffect(() => {
    dispatch(fetchSocialNetworkLink())
    // loadSocialNetworkLink()
  }, [dispatch])
  return (
    <>
      <h4>Edit SocialNetworkLink</h4>
      {socialNetworkLink.fetchStatus == "loading" && <LoadingDot />}
      {socialNetworkLink.fetchStatus == "success" && <SocialNetworkLinkForm formData={socialNetworkLink.data} />}
      <div>{/* <SocialNetworkLinkForm/> */}</div>
    </>
  )
}

export default SocialNetworkLink
