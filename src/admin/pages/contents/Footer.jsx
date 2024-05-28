
import { useDispatch, useSelector } from "react-redux"
import FooterForm from "@/admin/components/forms/FooterForm"
import footerSlice, { fetchFooter } from "@/global/store/features/footerSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Footer = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { footer } = state
  const { updateFooter } = footerSlice.actions
  console.log(footer)
  useEffect(() => {
    dispatch(fetchFooter())
    // loadFooter()
  }, [dispatch])
  return (
    <>
      <h4>Edit Footer</h4>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <FooterForm formData={footer.data} />}
      <div>{/* <FooterForm/> */}</div>
    </>
  )
}

export default Footer

  
  