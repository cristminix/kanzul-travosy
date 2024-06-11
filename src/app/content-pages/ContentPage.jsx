import React, { Component } from "react"

import CompanyContentPage from "./CompanyContentPage"
import FooterContentPage from "./FooterContentPage"
import PagesContentPage from "./PagesContentPage"
import KegiatanContentPage from "./KegiatanContentPage"
import LembagaContentPage from "./LembagaContentPage"
import PendaftaranContentPage from "./PendaftaranContentPage"
import FilesContentPage from "./FilesContentPage"
import { useLoaderData } from "react-router-dom"
import TemplateContentPage from './TemplateContentPage';
import ProfileContentPage from './ProfileContentPage';
import KontakContentPage from "./KontakContentPage"
import GaleryContentPage from "./GaleryContentPage"
import BeritaContentPage from "./BeritaContentPage"
import BlockEditorContentPage from "./BlockEditorContentPage"
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
  else if (mod === "template") {
    return <TemplateContentPage subModule={sub}/>
  }  
  else if (mod === "profile") {
    return <ProfileContentPage subModule={sub}/>
  }
  else if (mod === "kontak") {
    return <KontakContentPage subModule={sub}/>
  }
  else if (mod === "galery") {
    return <GaleryContentPage subModule={sub}/>
  }
  else if (mod === "berita") {
    return <BeritaContentPage subModule={sub}/>
  }
  else if (mod === "block-editor") {
    return <BlockEditorContentPage subModule={sub}/>
  }
}

export default ContentPage
