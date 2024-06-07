import React from "react"
import ReactDOM from "react-dom/client"
// import { BrowserRouter } from "react-router-dom"
// import App from "./app/App"
import Router from "./app/Router"
import "./i18n"
import { store,persistor } from "@/global/store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
// import * as serviceWorker from './serviceWorker';
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
)

// serviceWorker.unregister();
