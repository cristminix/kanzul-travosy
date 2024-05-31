const Toast = ({}) => {
  return (
    // <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    //   <div className="toast-header">
    //     <img src="/assets/images/logo/logo-dark.png" className="rounded mr-2" alt="..." />
    //     <strong className="mr-auto">Bootstrap</strong>
    //     <small>11 mins ago</small>
    //     <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    //       <span aria-hidden="true">&times;</span>
    //     </button>
    //   </div>
    //   <div className="toast-body">Hello, world! This is a toast message.</div>
    // </div>
    <>
      HELLO
      <button type="button" className="btn btn-primary" id="liveToastBtn">
        Show live toast
      </button>
      <div className="position-fixed bottom-0 right-0 p-3">
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="2000">
          <div className="toast-header">
            <img src="/assets/images/logo/logo-dark.png" className="rounded mr-2" alt="..." />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">Hello, world! This is a toast message.</div>
        </div>
      </div>
    </>
  )
}

export default Toast
