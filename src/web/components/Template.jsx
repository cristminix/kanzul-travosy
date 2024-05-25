import TagLine from "./TagLine"
import NavBar from "./NavBar"
import Hero from "./Hero"
import SearchBox from "./SearchBox"
import ShortProfile from "./ShortProfile"
import Footer from "./Footer"
import Switcher from "./Switcher"
import Preloader from "./Preloader"
import "../../global/css/template.css"
import { useEffect } from "react"
export default function Template({}) {
  useEffect (()=>{
    feather.replace();
  },[])
  return (
    <>
      <TagLine />
      {/* <NavBar /> */}
      {/* <Hero /> */}
      {/* <SearchBox/> */}
      {/* <ShortProfile /> */}
      <Footer />
      {/* <Switcher/> */}
      {/* <Preloader/> */}
    </>
  )
}
