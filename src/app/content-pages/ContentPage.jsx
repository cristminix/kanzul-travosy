import React, { Component } from "react"

import CompanyContentPage from "./CompanyContentPage"
import FooterContentPage from "./FooterContentPage"
import PagesContentPage from "./PagesContentPage"
import KegiatanContentPage from "./KegiatanContentPage"
import LembagaContentPage from "./LembagaContentPage"
import PendaftaranContentPage from "./PendaftaranContentPage"
import FilesContentPage from "./FilesContentPage"
import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
  const { mod, sub, pk, fk } = params
  return { mod, sub, pk, fk }
}

const ContentPage = ({}) => {
  const loaderData = useLoaderData()
  // console.log(loaderData)
  const { mod, sub, pk, fk } = loaderData
  // console.log(mod, sub, pk, fk)

  if (mod === "company") {
    return <CompanyContentPage />
  }
  else if (mod === "pages") {
    return <PagesContentPage />
  }
  else if (mod === "footer") {
    return <FooterContentPage />
  } 
  else if (mod === "lembaga") {
    return <LembagaContentPage />
  } 
  else if (mod === "kegiatan") {
    return <KegiatanContentPage />
  } 
  else if (mod === "pendaftaran") {
    return <PendaftaranContentPage subModule={sub}/>
  } 
  else if (mod === "files") {
    return <FilesContentPage subModule={sub}/>
  } 
  //else if (mod === "contact-person") {
  //   return <ContactPerson />
  // } else if (mod === "galery") {
  //   return <Galery />
  // } else if (mod === "search") {
  //   return <Search />
  // } else if (mod === "social-network-link") {
  //   return <SocialNetworkLink />
  // } else if (mod === "web-navigation") {
  //   return <WebNavigation />
  // } else if (mod === "homepage") {
  //   return <Homepage />
  // } else if (mod === "welcome-message") {
  //   return <WelcomeMessage />
  // } else if (mod === "footer") {
  //   return <Footer />
  // }
}

export default ContentPage
