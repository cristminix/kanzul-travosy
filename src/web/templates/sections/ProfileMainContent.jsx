import Hero from "../blocks/Hero"

import FullProfile from "../blocks/FullProfile"
import BannerCrumb from "../blocks/BannerCrumb"
import SectionHeading from "../blocks/SectionHeading"
// import Counter from "@/global/store/features/counter/Counter"

const ProfileMainContent = ({ profileData }) => {
  // console.log(profileData)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Profile", path: "/profile" },
  ]
  return (
    <>
      <BannerCrumb banner={profileData.banner} breadcrumbs={breadcrumbs} />
      <SectionHeading className="" title="Profile" content="Profile Pengasuh Pondok Pesantren Kanzululum" />
      <section className="relative md:twx-py-12 twx-py-8 overflow-hidden">
        <FullProfile className="mt-12" profile={profileData} />
      </section>
    </>
  )
}

export default ProfileMainContent