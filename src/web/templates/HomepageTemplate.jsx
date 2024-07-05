import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchBerita } from "@/global/store/features/beritaSlice"
import { fetchProduk } from "@/global/store/features/produkSlice"
import { fetchGalery } from "@/global/store/features/galerySlice"
import { fetchLembaga } from "@/global/store/features/lembagaSlice"
import { fetchProfile } from "@/global/store/features/profileSlice"
import { fetchMetaHomepage } from "@/global/store/features/metaSlice"
import { fetchHero } from "@/global/store/features/heroSlice"
import { fetchWelcomeMessage } from "@/global/store/features/welcomeMessageSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import HomepageMainContent from "./sections/HomepageMainContent"
import { Helmet } from "react-helmet-async"

const HomepageTemplate = ({}) => {
  const dispatch = useDispatch()

  const beritaState = useSelector((state) => state.berita)
  const produkState = useSelector((state) => state.produk)
  const galeryState = useSelector((state) => state.galery)
  const profileState = useSelector((state) => state.profile)
  const heroState = useSelector((state) => state.hero)
  const lembagaState = useSelector((state) => state.lembaga)
  const welcomeMessageState = useSelector((state) => state.welcomeMessage)

  const meta = useSelector((state) => state.meta.homepage)
  const BASE_URL = import.meta.env !== "PROD" ? "http://localhost:5173" : "https://ponpeskanzululumcirebon.com"
  useEffect(() => {
    dispatch(fetchBerita())
    dispatch(fetchProduk())
    dispatch(fetchGalery())
    dispatch(fetchProfile())
    dispatch(fetchHero())
    dispatch(fetchLembaga())
    dispatch(fetchWelcomeMessage())
    dispatch(fetchMetaHomepage())

    feather.replace()
  }, [dispatch])

  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <HomepageMainContent
          lembagaList={lembagaState.data}
          heroData={heroState.data}
          profileData={profileState.data}
          galeryList={galeryState.data.contents}
          beritaList={beritaState.data.contents}
          produkList={produkState.data.contents}
          welcomeMessageData={welcomeMessageState.data}
        />
      </ColumnLayout>
    </>
  )
}

export default HomepageTemplate
