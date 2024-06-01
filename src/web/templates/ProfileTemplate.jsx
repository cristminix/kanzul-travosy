import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import profileSlice, { fetchProfile } from "@/global/store/features/profileSlice"

import ColumnLayout from "./layouts/ColumnLayout" 
import ProfileMainContent from "./sections/ProfileMainContent"

const ProfileTemplate = ({}) => {
  
  
  const dispatch = useDispatch()

  const profileState = useSelector((state) => state.profile)

  useEffect(() => {
  
    dispatch(fetchProfile())
    feather.replace()

  }, [dispatch])
  return (
    <ColumnLayout>
      <ProfileMainContent profileData={profileState.data} />
    </ColumnLayout>
  )
}

export default ProfileTemplate
