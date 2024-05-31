const Breadcrumb = ({ breadcrumbs = [] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((item, index) => {
          return (
            <li className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active" : ""}`} key={index}>
              {index === 0 ? (
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
