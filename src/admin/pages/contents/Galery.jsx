import { useDispatch, useSelector } from "react-redux"
import GaleryForm from "@/admin/components/forms/GaleryForm"
import galerySlice, { fetchGalery } from "@/global/store/features/galerySlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Galery = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { galery } = state
  const { updateGalery } = galerySlice.actions
  console.log(galery)
  useEffect(() => {
    dispatch(fetchGalery())
    // loadGalery()
  }, [dispatch])
  return (
    <>
      <h4>Edit Galery</h4>
      {galery.fetchStatus == "loading" && <LoadingDot />}
      {galery.fetchStatus == "success" && <GaleryForm formData={galery.data} />}
      <div>{/* <GaleryForm/> */}</div>
    </>
  )
}

export default Galery
