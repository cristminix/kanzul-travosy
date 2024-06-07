import React from "react"
import ReactDOM from "react-dom/client"
import { store,persistor } from "@/global/store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import "./reachHideWarning"
export const mountApp = (app) => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {app}
    </PersistGate>
    </Provider>)
}
