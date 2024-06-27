import Breadcrumb from "./Breadcrumb"
const PageHeader = ({ pageTitle, breadcrumbs ,icon}) => {
  return (
    <div className="page-header">
      <h3 className="page-title twx-flex twx-items-center twx-uppercase"><span className="icon twx-mr-2">{icon}</span> <span>{pageTitle}</span></h3>
      <Breadcrumb breadcrumbs={breadcrumbs} />
    </div>
  )
}

export default PageHeader
