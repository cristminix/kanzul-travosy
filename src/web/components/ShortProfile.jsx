import SideToSide from "./SideToSide"
import TourPackage from "./TourPackage"
import Testimoni from "./Testimoni"
import BlogList from "./BlogList"
const ShortProfile = ({}) => {
  const styles = {}
  const cls0 = "cls-0 relative md:py-24 py-16 overflow-hidden"

  return (
    <>
      {/*<!-- Start -->*/}
      <section className={cls0}>
        <SideToSide />
        {/* <TourPackage /> */}
        {/* <Testimoni /> */}
        <BlogList />
      </section>{" "}
      {/*<!--end section-->*/}
      {/*<!-- End -->*/}
    </>
  )
}

export default ShortProfile
