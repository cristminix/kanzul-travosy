import Hero from "../blocks/Hero"

import FullProfile from "../blocks/FullProfile"
import BannerCrumb from "../blocks/BannerCrumb"

// import Counter from "@/global/store/features/counter/Counter"

const ProfileMainContent = ({ profileData }) => {
  console.log(profileData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Profile", path: "/profile" },
  ]
  return (
    <>
      <BannerCrumb banner={profileData.banner} breadcrumbs={breadcrumbs} />
      <section className="relative md:py-24 py-16 overflow-hidden">
        <FullProfile className="mt-12" profile={profileData} />
      </section>
    </>
  )
}

export default ProfileMainContent