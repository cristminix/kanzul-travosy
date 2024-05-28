import { useLoaderData } from "react-router-dom"
import Berita from "@/admin/pages/contents/Berita"
import Company from "@/admin/pages/contents/Company"
import ContactPerson from "@/admin/pages/contents/ContactPerson"
import Galery from "@/admin/pages/contents/Galery"
import Search from "@/admin/pages/contents/Search"
import SocialNetworkLink from "@/admin/pages/contents/SocialNetworkLink"
import WebNavigation from "@/admin/pages/contents/WebNavigation"
import Homepage from "@/admin/pages/contents/Homepage"
import WelcomeMessage from "@/admin/pages/contents/WelcomeMessage"
import Footer from "@/admin/pages/contents/Footer"

export async function loader({ params }) {
  const { module, fk, pk, pageNumber } = params
  return { module, pageNumber, pk, fk }
}
const Content = ({}) => {
  const { module, fk, pk, pageNumber } = useLoaderData()
  console.log(module, fk, pageNumber, pk)
  return (
    <>
      Content {module}/{fk}/{pk}/{pageNumber}
    </>
  )
}

export default Content
