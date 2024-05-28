
import { useDispatch, useSelector } from "react-redux"
import BeritaForm from "@/admin/components/forms/BeritaForm"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const Berita = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { berita } = state
  const { updateBerita } = beritaSlice.actions
  console.log(berita)
  useEffect(() => {
    dispatch(fetchBerita())
    // loadBerita()
  }, [dispatch])
  return (
    <>
      <h4>Edit Berita</h4>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <BeritaForm formData={berita.data} />}
      <div>{/* <BeritaForm/> */}</div>
    </>
  )
}

export default Berita

  
  