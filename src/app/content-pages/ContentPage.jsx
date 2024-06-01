import React, { Component } from "react"

import CompanyContentPage from "./CompanyContentPage"
import PagesContentPage from "./PagesContentPage"
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
  // else if (module == "berita") {
  //   return <Berita />
  // } else if (module == "contact-person") {
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
