import { useDispatch, useSelector } from "react-redux"
import CompanyForm from "@/admin/components/forms/CompanyForm"
import companySlice, { fetchCompany } from "@/global/store/features/companySlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Company = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { company } = state
  const { updateCompany } = companySlice.actions
  console.log(company)
  useEffect(() => {
    dispatch(fetchCompany())
    // loadCompany()
  }, [dispatch])
  return (
    <>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <CompanyForm formData={company.data} />}
      <div>{/* <CompanyForm/> */}</div>
    </>
  )
}

export default Company
