import Breadcrumb from "./Breadcrumb"
const PageHeader = ({ pageTitle, breadcrumbs }) => {
  return (
    <div className="page-header">
      <h3 className="page-title">{pageTitle}</h3>
      <Breadcrumb breadcrumbs={breadcrumbs} />
    </div>
  )
}

export default PageHeader
