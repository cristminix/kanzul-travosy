import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"
import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { addListener } from "@reduxjs/toolkit/react"

import PageHeader from "./partials/PageHeader"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const MainContentLayout = ({ pageTitle, breadcrumbs, children, className }) => {
  const location = useLocation()

  const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions

  const [alert, setAlert] = useState(null)
  const hideAlert = () => setAlert(null)
  const displayAlert = (type, title, message, onConfirm = () => setAlert(null)) => {
    setAlert(
      <SweetAlert type={type} title={title} onConfirm={onConfirm}>
        {message}
      </SweetAlert>,
    )
  }
  useEffect(() => {
		const unsubscribe = dispatch(
			addListener({
				predicate: (action, currentState, prevState) => {
					// console.log(currentState.content)
					return currentState.content.alertId !== prevState.content.alertId
				},
				effect: (action, listenerApi) => {
          const {content} = listenerApi.getState()
					console.log(content)
          const {type,title,message} = content.alert
          displayAlert(type,title,message)
          // setFilePreview(oData=>({...oData,...action.payload}))

					// console.log(action,listenerApi)
					// some logic here that will run when `state.some.field` changes
				},
			}),
		)

		return unsubscribe
	}, [])

  return (
    <div className={`main-content-component ${className}`}>
    {alert}
      <PageHeader pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
      <div className="row">{children}</div>
    </div>
  )
}

export default MainContentLayout
