import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"
import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { addListener } from "@reduxjs/toolkit/react"

import PageHeader from "./partials/PageHeader"
import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import DisplayToast from "./components/DisplayToast"
const MainContentLayout = ({ pageTitle, breadcrumbs, children, className,icon }) => {
  const location = useLocation()

  const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage, hideAlert, hideToast } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions

  const [alert, setAlert] = useState(null)
  const toastRef = useRef(null)
  const removeAlert = () => {
    setAlert(null)
    dispatch(hideAlert())
  }
  const removeToast = () => {
    toastRef.current.hide()
    dispatch(hideToast())
  }
  const displayAlert = (type, title, message, onConfirm = () => removeAlert()) => {
    setAlert(
      <SweetAlert type={type} title={title} onConfirm={onConfirm}>
        {message}
      </SweetAlert>,
    )
  }
  const displayToast = (type, title, message, onClose = () => removeToast()) => {
    // console.log(toastRef.current)
    toastRef.current.setParam(type, title, message, onClose)
    toastRef.current.show()
  }
  useEffect(() => {
    const unsubscribe = dispatch(
      addListener({
        predicate: (action, currentState, prevState) => {
          // console.log(currentState.content)
          return (
            currentState.content.alertId !== prevState.content.alertId ||
            currentState.content.toastId !== prevState.content.toastId
          )
        },
        effect: (action, listenerApi) => {
          const { content } = listenerApi.getState()
          // console.log(content)
          if (content.showAlert) {
            const { type, title, message } = content.alert
            displayAlert(type, title, message)
          }

          if (content.showToast) {
            const { type, title, message } = content.toast
            displayToast(type, title, message)
          }

          // setFilePreview(oData=>({...oData,...action.payload}))

          // console.log(action,listenerApi)
          // some logic here that will run when `state.some.field` changes
        },
      }),
    )

    return unsubscribe
  }, [])

  return (
  <> 
    <div className={`main-content-component ${className}`}>
      <DisplayToast ref={toastRef} />
      {alert}
     <PageHeader pageTitle={pageTitle} breadcrumbs={breadcrumbs} icon={icon}/>
      <div className="row">{children}</div>
    </div>
  </>)
}

export default MainContentLayout
