import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"
import galerySlice, { fetchGalery } from "@/global/store/features/galerySlice"
import profileSlice, { fetchProfile } from "@/global/store/features/profileSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import HomepageMainContent from "./sections/HomepageMainContent"

const HomepageTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const beritaState = useSelector((state) => state.berita)
  const galeryState = useSelector((state) => state.galery)
  const profileState = useSelector((state) => state.profile)

  useEffect(() => {
  
    dispatch(fetchBerita())
    dispatch(fetchGalery())
    dispatch(fetchProfile())

    feather.replace()

  }, [dispatch])

 
  return (
    <ColumnLayout>
      <HomepageMainContent profileData={profileState.data} galeryList={galeryState.data} beritaList={beritaState.data} />
    </ColumnLayout>
  )
}

export default HomepageTemplate
