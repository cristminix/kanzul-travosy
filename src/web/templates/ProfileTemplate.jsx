import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchProfile } from "@/global/store/features/profileSlice"
import { fetchMetaProfile } from "@/global/store/features/metaSlice"

import ColumnLayout from "./layouts/ColumnLayout"
import ProfileMainContent from "./sections/ProfileMainContent"
import { Helmet } from "react-helmet-async"

const ProfileTemplate = ({}) => {
  const dispatch = useDispatch()

  const profileState = useSelector((state) => state.profile)
  const meta = useSelector((state) => state.meta.profile)
  const BASE_URL = "https://www.ponpeskanzululumcirebon.com"

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchMetaProfile())
    feather.replace()
  }, [dispatch])
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta["meta-description"]} />
          <link rel="canonical" href={`${BASE_URL}/profile/`} />
        </Helmet>
      )}
      <ColumnLayout>
        <ProfileMainContent profileData={profileState.data} />
      </ColumnLayout>
    </>
  )
}

export default ProfileTemplate
