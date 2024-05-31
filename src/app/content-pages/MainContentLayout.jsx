import PageHeader from "./partials/PageHeader"
const MainContentLayout = ({ pageTitle, breadcrumbs, children,className}) => {
  return (
    <div className={`main-content-component ${className}`}>
      <PageHeader pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
      <div className="row">{children}</div>
    </div>
  )
}

export default MainContentLayout
