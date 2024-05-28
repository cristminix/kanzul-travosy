import { useDispatch, useSelector } from "react-redux"
import ContactPersonForm from "@/admin/components/forms/ContactPersonForm"
import contactPersonSlice, { fetchContactPerson } from "@/global/store/features/contactPersonSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const ContactPerson = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { contactPerson } = state
  const { updateContactPerson } = contactPersonSlice.actions
  console.log(contactPerson)
  useEffect(() => {
    dispatch(fetchContactPerson())
    // loadContactPerson()
  }, [dispatch])
  return (
    <>
      <h4>Edit ContactPerson</h4>
      {contactPerson.fetchStatus == "loading" && <LoadingDot />}
      {contactPerson.fetchStatus == "success" && <ContactPersonForm formData={contactPerson.data} />}
      <div>{/* <ContactPersonForm/> */}</div>
    </>
  )
}

export default ContactPerson
