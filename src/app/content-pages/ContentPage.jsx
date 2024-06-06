import React, { Component } from "react"

import CompanyContentPage from "./CompanyContentPage"
import FooterContentPage from "./FooterContentPage"
import PagesContentPage from "./PagesContentPage"
import KegiatanContentPage from "./KegiatanContentPage"
import LembagaContentPage from "./LembagaContentPage"
import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
  const { module, fk, pk, pageNumber } = params
  return { module, pageNumber, pk, fk }
}

const ContentPage = ({}) => {
  const { module, fk, pk, pageNumber } = useLoaderData()
  console.log(module, fk, pageNumber, pk)

  if (module == "company") {
    return <CompanyContentPage />
  }
  else if (module == "pages") {
    return <PagesContentPage />
  }
  else if (module == "footer") {
    return <FooterContentPage />
  } 
  else if (module == "lembaga") {
    return <LembagaContentPage />
  } 
  else if (module == "kegiatan") {
    return <KegiatanContentPage />
  } 
  //else if (module == "contact-person") {
  //   return <ContactPerson />
  // } else if (module == "galery") {
  //   return <Galery />
  // } else if (module == "search") {
  //   return <Search />
  // } else if (module == "social-network-link") {
  //   return <SocialNetworkLink />
  // } else if (module == "web-navigation") {
  //   return <WebNavigation />
  // } else if (module == "homepage") {
  //   return <Homepage />
  // } else if (module == "welcome-message") {
  //   return <WelcomeMessage />
  // } else if (module == "footer") {
  //   return <Footer />
  // }
}

export default ContentPage
