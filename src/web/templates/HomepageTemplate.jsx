import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import beritaSlice, { fetchBerita } from "@/global/store/features/beritaSlice"
import produkSlice, { fetchProduk } from "@/global/store/features/produkSlice"
import galerySlice, { fetchGalery } from "@/global/store/features/galerySlice"
import profileSlice, { fetchProfile } from "@/global/store/features/profileSlice"
import heroSlice, { fetchHero } from "@/global/store/features/heroSlice"
import welcomeMessageSlice, { fetchWelcomeMessage } from "@/global/store/features/welcomeMessageSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import HomepageMainContent from "./sections/HomepageMainContent"

const HomepageTemplate = ({}) => {
  const dispatch = useDispatch()

  const beritaState = useSelector((state) => state.berita)
  const produkState = useSelector((state) => state.produk)
  const galeryState = useSelector((state) => state.galery)
  const profileState = useSelector((state) => state.profile)
  const heroState = useSelector((state) => state.hero)
  const welcomeMessageState = useSelector((state) => state.welcomeMessage)
  // console.log(welcomeMessageState)
  useEffect(() => {
    dispatch(fetchBerita())
    dispatch(fetchProduk())
    dispatch(fetchGalery())
    dispatch(fetchProfile())
    dispatch(fetchHero())
    dispatch(fetchWelcomeMessage())

    feather.replace()
  }, [dispatch])

  return (
    <ColumnLayout>
      <HomepageMainContent
        heroData={heroState.data}
        profileData={profileState.data}
        galeryList={galeryState.data.contents}
        beritaList={beritaState.data.contents}
        produkList={produkState.data.contents}
        welcomeMessageData={welcomeMessageState.data}
      />
    </ColumnLayout>
  )
}

export default HomepageTemplate
