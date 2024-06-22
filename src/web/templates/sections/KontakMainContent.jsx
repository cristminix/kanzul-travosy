import GoogleMap from "../blocks/GoogleMap"
import ContactForm from "../blocks/ContactForm"
import ContactAddress from "../blocks/ContactAddress"

const KontakMainContent = ({ kontakData, companyData }) => {
  const cls4 = "cls-4 relative lg:py-24 py-16"

  // console.log(kontakData)
  // console.log(companyData)
  // const breadcrumbs = [
  //   { title: "Home", path: "/" },
  //   { title: "Kontak", path: "/kontak" },
  // ]
  return (
    <>
      <GoogleMap embedUrl={companyData.googleMapEmbedUrl} />
      <section className={cls4}>
        <ContactForm />
        <ContactAddress company={companyData}/>
      </section>
    </>
  )
}

export default KontakMainContent
